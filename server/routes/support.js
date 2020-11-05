const cors = require('cors');

const express = require('express');
const Support = require('./../models/support');

const routeAuthenticationGuard = require('./../middleware/route-guard');
const Place = require('../models/place');
const User = require('../models/user');

const supportRouter = new express.Router();

supportRouter.get('/', (request, response, next) => {
  Support.find()
    .populate('creator')
    .sort({ creationDate: -1 })
    .then(supports => {
      response.json({ supports });
    })
    .catch(error => {
      next(error);
    });
});

supportRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const support = await Support.findById(id).populate('creator');
    if (support) {
      response.json({ support });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

supportRouter.post('/:id', async (req, res, next) => {
  const placeId = req.params.id;
  const { content } = req.body;
  console.log('content: ', content);
  try {
    const user = await User.findById(req.session.userId);
    const place = await Place.findById(placeId).populate('supports');
    if (place.supports.some(support => support.creator === req.user._id)) {
      const error = new Error("You've already supported this place.");
      next(error);
    }

    const support = await Support.create({
      creator: req.user._id,
      place: placeId,
      content
    });

    user.supports.push(support._id);
    user.save();

    place.supports.push(support._id);
    place.save();

    res.json({ support });
  } catch (error) {
    next(error);
  }
});

supportRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (req, res, next) => {
    const id = req.params.id;
    console.log('id: ', id);
    try {
      const support = await Support.findOneAndDelete({
        place: id,
        creator: req.user._id
      });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { supports: support._id }
      });
      await Place.findByIdAndUpdate(id, {
        $pull: { supports: support._id }
      });
      res.json('Deleted your support from this place');
    } catch (error) {
      next(error);
    }

    Place.findOneAndUpdate(
      { supports: { $in: [id] } },
      { $pull: { supports: id } }
    );
  }
);

supportRouter.patch(
  '/:id',
  routeAuthenticationGuard,
  (request, response, next) => {
    const { content } = request.body;
    const id = request.params.id;
    Support.findOneAndUpdate(
      { place: id, creator: request.user._id },
      { content },
      { new: true }
    )
      .then(post => {
        response.json({ post });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = supportRouter;
