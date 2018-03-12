'use strict';

const mongoose = require('mongoose'),
  Solar = mongoose.model('Solar'),
  jwt = require('jsonwebtoken');

exports.api_home = (req, res) => {
  res.send('Hi Friend! The API is at http://localhost:' + global.__port + '/api/v1/solar');
};

exports.list_all_solar = (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  let userState = jwt.decode(token);
  if (token) {
    jwt.verify(token, global.__app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        Solar.find({State: userState.state})
          .limit(20)
          .exec((err, solar) => {
            if (err)
              res.send(err);
            res.json(solar);
          });
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

exports.create_a_solar = (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, global.__app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        let new_solar = new Solar(req.body);
        new_solar.save((err, solar) => {
          if (err)
            res.send(err);
            res.json(solar);
        });
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

exports.read_a_solar = (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, global.__app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        Solar.findById(req.params.solarId, (err, solar) => {
          if (err)
            res.send(err);
            res.json(solar);
        });
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

exports.update_a_solar = (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, global.__app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        Solar.findOneAndUpdate({_id: req.params.solarId}, req.body, {new: true}, (err, solar) => {
          if (err)
            res.send(err);
          res.json(solar);
        });
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

exports.delete_a_solar = (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, global.__app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        Solar.remove({
          _id: req.params.solarId
        }, (err, solar) => {
          if (err)
            res.send(err);
          res.json({message: 'Solar Data successfully deleted'});
        });
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
