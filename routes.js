const express = require("express");
const router = new express.Router();

// router.use('/v1', require("./v1"));
const auth = require("./middleware/auth");

router.post('/login', auth.optional, require("./controllers/users/login"));
router.post('/signup', auth.optional, require("./controllers/users/signup"));

router.all("*", (req, res) => res.status(400).send({data: null, message: "Welcome", error: false}))

module.exports = router