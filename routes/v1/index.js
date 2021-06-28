const express = require("express");
const router = new express.Router();
const auth = require("../auth");

router.post('/login', auth.optional, require("./users/login"));
router.post('/signup', auth.optional, require("./users/signup"));

module.exports = router