'use strict';
const mongoose = require('mongoose'),
  Users = mongoose.model('Users'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

exports.authenticate = (req, res) => {
  Users.findOne({
    name: req.body.name
  }, (err, user) => {

    if (err) throw err;
    if (!user) {

      res.json({success: false, message: 'Authentication failed. User not found.'});

    } else if (user) {

      let userPassword = req.body.password;
      let hash = user.password;
      bcrypt.compare(userPassword, hash, (err, result) => {
        if (result) {
          const payload = {
            name: user.name,
            state: user.state
          };
          let token = jwt.sign(payload, global.__app.get('superSecret'), {
            expiresIn: 1440 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Token Created!',
            token: token
          });
        } else {
          res.json({success: false, message: 'Authentication failed. Wrong password.'});
        }
      });

    }
  });
};

exports.list_all_users = (req, res) => {
  Users.find({}, (err, user) => {
    if (err)
      res.send(err);
      res.json(user);
  })
};

exports.create_a_users = (req, res) => {
  let user = req.body;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;

    let new_user = new Users(req.body);
    new_user.save((err, user) => {
      if (err)
        res.send(err);
        res.json(user);
    });

  })
};

exports.read_a_users = (req, res) => {
  Users.findById(req.params.userId, (err, user) => {
    if (err)
      res.send(err);
      res.json(user);
  });
};

exports.update_a_users = (req, res) => {
  let user = req.body;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {
      if (err)
        res.send(err);
        res.json(user);
    });
  })
};

exports.delete_a_users = (req, res) => {
  Users.remove({
    _id: req.params.userId
  }, (err, user) => {
    if (err)
      res.send(err);
      res.json({message: 'User successfully deleted!'});
  });
};

