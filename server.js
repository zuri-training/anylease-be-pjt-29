const express = require('express');
const dotenv = require('dotenv');
//const cors = require('cors');

dotenv.config();

const app = express()

//app.use(cors());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("Successfully conneected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({
        "description": "REST API for anyLease , containing routes",
        "routes":""
    });
});

app.get('*', (req, res) => {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
})

const port = process.env.PORT || 3050;

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
