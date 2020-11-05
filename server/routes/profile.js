'use strict';

const express = require('express');
const User = require('../models/user');
const Place = require('../models/place');

const routeAuthenticationGuard = require('../middleware/route-guard');

const fileUploader = require('../cloudinary-config');
const bcrypt = require('bcrypt');

const profileRouter = new express.Router();

profileRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select('username name gender owner avatar locality supports info')
      .populate('supports')
      .populate({
        path: 'supports',
        populate: {
          path: 'place',
          model: 'Place',
          select: '_id name category address_components images'
        }
      });
    const place = await Place.findOne({ owner: id });
    if (user) {
      res.json({ user, place });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.patch('/:id', fileUploader.any(), async (req, res, next) => {
  const {
    name,
    username,
    password,
    gender,
    about,
    birthday,
    privateAddress,
    email
  } = req.body;

  const id = req.params.id;

  let avatar;
  if (req.files) {
    avatar = req.files[0].path;
  }

  let locality;
  if (privateAddress) {
    locality = privateAddress.find(
      component =>
        component.types.includes('locality') ||
        component.types.includes('administrative_area_level_1')
    ).short_name;
  }

  try {
    let hashAndSalt;
    if (password && password.length > 1 && password.length < 8) {
      throw new Error('Password is too short.');
    } else if (password && password.length >= 8) {
      hashAndSalt = await bcrypt.hash(password, 10);
    }
    const obj = {
      user: req.user._id,
      name,
      username,
      gender,
      info: {
        birthday,
        gender,
        about
      },
      privateAddress,
      locality,
      email,
      avatar,
      passwordHashAndSalt: hashAndSalt
    };

    for (let prop in obj) {
      if (!obj[prop]) delete obj[prop];
    }

    const user = await User.findByIdAndUpdate(id, obj, { new: true });
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        locality: user.locality,
        owner: user.owner
      }
    });
  } catch (error) {
    next(error);
  }
});

profileRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (req, res, next) => {
    const id = req.params.id;

    User.findOneAndDelete({ _id: id, creator: req.user._id })
      .then(() => {
        res.json({});
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = profileRouter;
