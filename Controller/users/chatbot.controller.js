const axios = require("axios");
const productRepository = require("../../Repository/users/product.repository");
const userRepository = require("../../Repository/auth/user.repository");
const { type } = require("os");

const buyerMapping = {
  FindAllProducts: {
    type: "list_cons",
    func: productRepository.findProductByString,
  },
};

const sellerMapping = {
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
};

const queryChatbot = async (request) => {
  try {
    const { query, userType, userId } = request;
    console.log(userType);
    const response = await axios.post(process.env.CHATBOT_URL + "/query", {
      userQuery: query,
      userType: userType,
    });

    const message = response.data.message;
    const name = response.data.name;

    if (name == "None()") {
      return {
        message: message,
        data: {
          type: "none",
        },
      };
    }

    console.log(name);

    if (userType == "Producer") {
      console.log("hello");
      let data;
      const regex = /\b([a-zA-Z_]\w*)\s*\(/;

      const match = name.match(regex);
      console.log(match);

      const functionCalled = sellerMapping[match[1]];

      if (match[1] == "FindListedProduct") {
        data = await productRepository.getAllProductByUserId(userId);
        console.log(data);
      } else {
        data = null;
      }
      return {
        message: message === undefined ? "" : message,
        data: {
          type: functionCalled.type,
          data: data,
        },
      };
    } else {
      const regex =
        /^(\w+)\(\s?(\[[^\]]*\]|null|None|\[\]),\s?(\d+|null|None),\s?(\d+|null|None),\s?('[^']*'|null|None)\s?\)$/;
      const match = name.match(regex);
      console.log(match);

      let functionCalled;
      let data;

      functionCalled = buyerMapping[match[1]];

      if (match[1] == "FindAllProducts") {
        const city = match[5] === "null" ? null : match[5]; // city
        const limit = match[4] === "null" ? null : parseInt(match[4]); // limit
        data = await productRepository.findProductByString(
          match[2],
          limit,
          city,
        );
      } else if (match[1] == "FindListedProduct") {
        data = await functionCalled.func(userId);
        console.log(data);
      } else {
        data = null;
      }
      return {
        message: message === undefined ? "" : message,
        data: {
          type: functionCalled.type,
          data: data,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error" };
  }
};

module.exports = {
  queryChatbot,
};
