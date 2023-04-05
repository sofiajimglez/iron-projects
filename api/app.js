require('dotenv').config();

const express = require('express');
const logger = require('morgan'); //shows http requests in the 
const mongoose = require('mongoose');
const createError = require('http-errors');
const helmet = require('helmet'); //helps secure by setting various HTTP headers

/* Load configuration */
require('./config/db.config');

const app = express();

app.use(express.json()); //requests in json format can be interpreted
app.use(logger('dev')); //morgan's middleware 
app.use(helmet()); //helmet's middleware

app.use('/api/v1', require('./config/routes.config')); //configures the router

/* Error handling */
app.use((req, res, next) => next(createError(404, 'Route not found')));

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error); //reassigns the value of error
  } else if (error instanceof mongoose.Error.CastError && error.path === '_id') {
    const resourceName = error.model().constructor.modelName;
    error = createError(404, `${resourceName} not found`);
  } else if (!error.status) {
    error = createError(500, error);
  }
  
  console.error(error);

  const data = {
    message: error.message,
  }

  if (error.errors) {
    const errors = Object.keys(error.errors) //each key is the name of the field with validation errors
      .reduce((errors, errorKey) => { //(accumulator, currentValue) - currentValue: key
        errors[errorKey] = error.errors[errorKey].message;
        return errors;
      }, {});
      data.errors = errors;
  }

  res.status(error.status).json(data); //responds with the error in json format
})

/* Port */
const port = process.env.PORT || '3001';
app.listen(port, () => console.info(`Application is running at port ${port}`));
