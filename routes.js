const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Listen for requests
app.listen(port);

// Get Homepage
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

// Get Signup page
app.get('/signup', (req, res) => {
    res.sendFile('./signup.html', {root: __dirname});
});

// Get Signin page
app.get('/signin', (req, res) => {
    res.sendFile('./signin.html', {root: __dirname});
});

// Get My Account page
app.get('/account', (req, res) => {
    res.sendFile('./account.html', {root: __dirname});
});

// Get Products page
app.get('/products', (req, res) => {
    res.sendFile('./products.html', {root: __dirname});
});

// Get Ratings and Reviews page
app.get('/reviews', (req, res) => {
    res.sendFile('./reviews.html', {root: __dirname});
})

// Get About page
app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname});
});

// Get Contact page
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname});
});

// Get Help page
app.get('/help', (req, res) => {
    res.sendFile('./help.html', {root: __dirname});
});

// Get Our Locations page
app.get('/locations', (req, res) => {
    res.sendFile('./locations.html', {root: __dirname});
});

// Use 404 page for invalid requests
app.use((req, res) => {
    res.status(404).sendFile('./404.html', {root: __dirname});
});