const { category } = require("../../Models/category")

exports.createCategory = async (name) => {
  const newCategory = new category({
    name: name
  })
  return await newCategory.save();
}

exports.getAllCategory = async () => {
  return await category.find({});
}

exports.updateCategory = async (id, name) => {
  return await category.updateOne({ _id: id }, {
    $set: {
      name: name
    }
  })
}

exports.categoryExists = async(name) => {
  const categoryCount = await category.countDocuments({name : name});
  return categoryCount > 0;
}
