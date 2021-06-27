const express = require('express');
const connectDB = require('./db');
require('dotenv').config();  // allows us to use the environmental variables in .env
const { PORT } = process.env;

//connect to db
connectDB();

// Initialise Express
const app = express();

// Initialise Express middleware
app.use(express.json({ extended: false }));

//Create a basic express route
app.get('/', (req, res) => res.json({ message: "Welcome to AnyLease" }));

// PORT
const port = process.env.PORT || PORT;

// Listen to connection
app.listen(port, () => console.log(`app running on port ${port}`));