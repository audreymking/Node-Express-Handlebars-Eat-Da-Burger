// Imports the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
  all(cb) {
    orm.all('burgers', (res) => cb(res));
  },
  // The variables cols and vals are arrays.
  create(cols, vals, cb) {
    orm.create('burgers', cols, vals, (res) => cb(res));
  },
  update(colVals, condition, cb) {
    orm.update('burgers', colVals, condition, (res) => cb(res));
  },
  delete(condition, cb) {
    orm.delete('burgers', condition, (res) => cb(res));
  },
};

// Exports the database functions for the controller (burger_controller.js).
module.exports = burger;
