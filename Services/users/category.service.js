const categoryRepository = require("../../Repository/users/category.repository");
const { AppError } = require("../../utils/error");
const { GeneralResponse } = require("../../utils/response");

module.exports.createCategory = async (name) => {
  try {
    if (await categoryRepository.categoryExists(name)) {
      return new GeneralResponse(false, null, 403, "Category Already Exists");
    }
    await categoryRepository.createCategory(name);
    return new GeneralResponse(true, null, 200, "Category Created Successully");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during location update");
  }
};

module.exports.getAllCategory = async () => {
  try {
    const data = await categoryRepository.getAllCategory();
    return new GeneralResponse(true, data, 200, "Fetched Successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during location update");
  }
};

module.exports.updateCategory = async (id, name) => {
  try {
    const data = await categoryRepository.updateCategory(id, name);
    if (data.modifiedCount > 0) {
      return new GeneralResponse(true, data, 200, "Update Successully");
    }
    return new GeneralResponse(
      false,
      null,
      401,
      "No documents matched the update criteria or the updated document already exists"
    );
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during location update");
  }
};
