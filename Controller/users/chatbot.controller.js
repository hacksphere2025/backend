const axios = require("axios");
const productRepository = require("../../Repository/users/product.repository");
const userRepository = require("../../Repository/auth/user.repository");

const mapping = {
  AddProduct: {
    type: "add_prod",
    func: "sample",
  },
  FindListedProduct: {
    type: "list_prod_prod",
    func: productRepository.getAllProductByUserId,
  },
  UpdateListedProduct: {
    type: "update_list_prod",
    func: "sample",
  },
  FindAllProducts: {
    type: "list_cons",
    func: productRepository.findProductByString,
  },
  None: {
    type: "none",
    func: "none",
  },
};

const queryChatbot = async (req, res) => {
  try {
    const email = req.user.email;

    const { query, userType } = req.body;

    const response = await axios.post(process.env.CHATBOT_URL + "/query", {
      userQuery: query,
      userType: userType,
    });

    const message = response.data.response.message;
    const name = response.data.response.name;
    console.log(message + " " + name);
    const match = name.match(
      /^(\w+)\(\[([^\]]+)\],\s*([^,]+),\s*([^,]+),\s*([^,]+)\)$/,
    );
    let functionCalled;
    let data;
    functionCalled = mapping[match[1]];
    if (match[1] == "FindAllProducts") {
      const city = match[5] === "null" ? null : match[5]; // Corrected city assignment
      const limit = match[4] === "null" ? null : parseInt(match[4]); // Corrected limit assignment
      console.log(match[2], city, limit);
      data = await productRepository.findProductByString(match[2], limit, city);
    } else if (match[1] == "FindListedProduct") {
      const user_id = await userRepository.getUserByEmail(email);
      data = await functionCalled.func(user_id);
      console.log(data);
    } else {
      data = null;
    }
    return res.status(200).json({
      message: message,
      data: {
        type: functionCalled.type,
        data: data,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  queryChatbot,
};
