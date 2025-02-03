const express = require("express");
const { userLogin } = require("../Controller/auth/auth.controller");

const router = express.Router();

router.get("/login", userLogin);

module.exports = router;
