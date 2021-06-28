const express = require("express");
const router = new express.Router();

router.use('/v1', require("./v1"));

router.all("*", (req, res) => res.status(400).send({data: null, message: "Welcome", error: false}))

module.exports = router