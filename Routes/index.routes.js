const express = require("express");
const { userLogin } = require("../Controller/auth/auth.controller");

router = express.Router();

router.get("/login", userLogin);

module.exports = router;
