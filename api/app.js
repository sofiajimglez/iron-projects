require('dotenv').config();

const express = require('express');
const logger = require('morgan'); //shows http requests in the terminal
const createError = require('http-errors');

/* Load configuration */
require('./config/db.config');

const app = express();

app.use(logger, 'dev'); //morgan's middleware 

/* Error handling */
app.use((req, res, next) => next(createError(404, 'Route not found')));

app.use((error, req, res, next) => {
  if (!error.status) {
    error = createError(500, error);
  }
  console.error(error);

  const data = {
    message: error.message
  }

  res.status(error.status)
    .json(data); //responds with the error in json
})

/* Port */
const port = process.env.PORT || '3001';
app.listen(port, () => console.info(`Application is running at port ${port}`));
