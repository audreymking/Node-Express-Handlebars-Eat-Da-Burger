// Imports MySQL connection.
const connection = require('./connection.js');

// Adds question marks (?, ?, ?)
const addQuestionMark = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// Converts object key/value to SQL
const sqlObj = (ob) => {
  const arr = [];

  // Loops through the keys and pushes the key/value as a string
  for (const key in ob) {
    let value = ob[key];
    // Checks hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // Add quotations
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      arr.push(`${key}=${value}`);
    }
  }

  // Returns a string
  return arr.toString();
};

// Orm object
const orm = {
  all(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += addQuestionMark(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }
      //calls back the result
      cb(result);
    });
  },
  // update data
  update(table, colVals, condition, cb) {
    let queryString = `UPDATE ${table}`;

    queryString += ' SET ';
    queryString += sqlObj(colVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  //deletes data
  delete(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Exports the orm object to burger.js model.
module.exports = orm;

