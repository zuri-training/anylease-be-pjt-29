const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Listen for requests
app.listen(port);

// Get homepage
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

// Get signup page
app.get('/signup', (req, res) => {
    res.sendFile('./signup.html', {root: __dirname});
});

// Get signin page
app.get('/signin', (req, res) => {
    res.sendFile('./signin.html', {root: __dirname});
});

// Use 404 page for invalid requests
app.use((req, res) => {
    res.statusCode(404).sendFile('./404.html', {root: __dirname});
});