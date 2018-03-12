'use strict';
module.exports = (app) => {
  const solarList = require('../controllers/solarController');
  const userList = require('../controllers/userController');

  // Solar API Rest Routes
  app.route('/')
    .get(solarList.api_home);

  app.route('/api/v1/solar')
    .get(solarList.list_all_solar)
    .post(solarList.create_a_solar);

  app.route('/api/v1/solar/:solarId')
    .get(solarList.read_a_solar)
    .put(solarList.update_a_solar)
    .delete(solarList.delete_a_solar);

  // Users API Rest Routes
  app.route('/api/v1/users')
    .get(userList.list_all_users)
    .post(userList.create_a_users);

  app.route('/api/v1/users/:userId')
    .get(userList.read_a_users)
    .put(userList.update_a_users)
    .delete(userList.delete_a_users);

  app.route('/api/v1/users/authenticate')
    .post(userList.authenticate);
};
