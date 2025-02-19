const { category } = require("../../Models/userModels/category.model");

exports.createCategory = async (name) => {
  const newCategory = new category({
    name: name,
  });
  return await newCategory.save();
};

exports.getAllCategory = async () => {
  return await category.find({}).select("-__v").exec();
};

exports.updateCategory = async (id, name) => {
  return await category.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
      },
    }
  );
};

exports.categoryExists = async (name) => {
  const categoryCount = await category.countDocuments({ name: name });
  return categoryCount > 0;
};
