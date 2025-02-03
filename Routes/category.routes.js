const express = require("express");
const { createCategory, getAllCategory, updateCategory } = require("../Controller/category/category.controller");

const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.patch('/', updateCategory);

module.exports = categoryRouter;
