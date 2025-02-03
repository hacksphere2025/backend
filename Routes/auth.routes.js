const express = require("express");
const { userLogin, createUser } = require("../Controller/auth/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", userLogin);
authRouter.post("/signup", createUser);

module.exports = authRouter;
