const express = require("express");
const {
  createCategory,
  getAllCategory,
  updateCategory,
} = require("../../Controller/users/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/add", createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.patch("/", updateCategory);

module.exports = categoryRouter;
