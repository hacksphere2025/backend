const categoryService = require("../../Services/category/category.service");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "The field name is required" });
    }
    const response = await categoryService.createCategory(name);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllCategory = async (req, res) => {
  try {
    const data = await categoryService.getAllCategory();
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ message: "The field id is required" })
    }
    const response = await categoryService.updateCategory(id, name);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory
}


