'use strict';

const { Router } = require('express');

const bcrypt = require('bcrypt');
const User = require('./../models/user');

const authenticationRouter = new Router();

const fileUploader = require('../cloudinary-config');

const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const generateId = length => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

function sendMail(user) {
  return transport.sendMail({
    from: 'Localism" <process.env.NODEMAILER_EMAIL>',
    to: `${user.email}`,
    subject: 'Welcome to Localism!',
    html: `<b>Hello!</b>
  please confirm your email clicking <a href = "http://localhost:3000/authentication/confirmation/${user.token}">Click here</a>`
  });
}

authenticationRouter.post(
  '/sign-up',
  fileUploader.single('avatar'),
  async (req, res, next) => {
    const { name, username, email, password, address_components } = req.body;

    try {
      const userExists = await User.findOne({ $or: [{ username }, { email }] });
      if (userExists) throw new Error('User already exists.');
      let url;
      if (req.file) {
        url = req.file.path;
      }

      const locality = address_components.find(
        component =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
      ).short_name;

      if (password.length < 8) throw new Error('Password is too short.');
      const hashAndSalt = await bcrypt.hash(password, 10);
      const token = generateId(10);
      const user = await User.create({
        name,
        username,
        email,
        token,
        privateAddress: address_components,
        locality,
        avatar: url,
        passwordHashAndSalt: hashAndSalt
      });
      sendMail(user).then(() => {
        req.session.userId = user._id;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      });
    } catch (error) {
      next(error);
    }
  }
);

authenticationRouter.post('/sign-in', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) res.status(401).send('No user with that username.');
    const passwordHashAndSalt = user.passwordHashAndSalt;
    const comparison = await bcrypt.compare(password, passwordHashAndSalt);
    if (!comparison) throw new Error('Password did not match.');

    req.session.userId = user._id;
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

authenticationRouter.get(`/confirmation/:token`, async (req, res, next) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({ token });
    if (user.active) {
      res.json({ message: "You've already confirmed your email." });
    } else if (!user) {
      res.json({ message: 'No user with that email.' });
    } else {
      user.active = true;
      user.save();
      res.json({
        message: "You've confirmed your e-mail! Please log in."
      });
    }
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

authenticationRouter.get('/me', (req, res) => {
  const user = req.user;
  res.json({ user });
});

authenticationRouter.get('/me/full', async (req, res, next) => {
  const id = req.session.userId;

  try {
    const user = await User.findById(id).select(
      '_id name email username avatar privateAddress locality info owner'
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = authenticationRouter;
