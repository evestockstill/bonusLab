/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('../lib/middleware/errorHandler');
const recipes = require('./routes/recipes');
const events = require('./routes/events');
app.use(errorHandler);
app.use(express.json());

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/events', events);


module.exports = app;
