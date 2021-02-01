'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

app.use('/users', require('./routes'))

if (!module.parent) app.listen(3000, () => {
  console.log('Server is listening on port 3000!');
}); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.

module.exports = app; // this line is only used to make testing easier.
