const cors = require("cors");
const errorHandler = require('errorHandler');
const express = require('express');
const formData = require("express-form-data");
const mongoose = require("mongoose");

require('dotenv').config(); // allows us to use the environmental variables in .env

const routes = require("./routes");

const { NODE_ENV, PORT, MONGO_URI } = process.env;

const isProduction = NODE_ENV === 'production'

// Initialise Express
const app = express();
// PORT
const port = PORT || 8080;

app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(formData.parse())

if(!isProduction) app.use(errorHandler())

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('debug', true)

app.use(routes);

// Listen to connection
app.listen(port, () => console.log(`app running on port ${port}`));