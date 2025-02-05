const axios = require("axios");
const productRepository = require("../../Repository/producer/product/product.repository")

const mapping = {
  "AddProduct": {
    "type": "add",
    "func": "sample"
  },
  "FindListedProduct": {
    "type": "list",
    "func": "sample"
  },
  "UpdateListedProduct": {
    "type": "list",
    "func": "sample"
  },
  "FindAllProducts": {
    "type": "list",
    "func": productRepository.findProductByString
  }
}

const queryChatbot = async (req, res) => {
  try {
    const email = req.user.email;

    const {
      query,
      userType
    } = req.body;

    const response = await axios.post(process.env.CHATBOT_URL + "/query", {
      "userQuery": query,
      "userType": userType
    });

    const message = response.data.message;
    const name = response.data.name;


    const match = name.match(/^(\w+)\((.*)\)$/);
    const functionCalled = mapping[match[1]];
    const data = await functionCalled.func(match[2])

    return res.status(200).json({
      message: message,
      data: {
        type: functionCalled.type,
        data: data
      }
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  queryChatbot
}
