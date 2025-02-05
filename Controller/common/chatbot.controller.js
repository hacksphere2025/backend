const axios = require("axios");
const productRepository = require("../../Repository/producer/product/product.repository")
const userRepository = require("../../Repository/user/user.repository")
const mapping = {
  "AddProduct": {
    "type": "add_prod",
    "func": "sample"
  },
  "FindListedProduct": {
    "type": "list_prod_prod",
    "func": productRepository.getAllProductByUserId
  },
  "UpdateListedProduct": {
    "type": "update_list_prod",
    "func": "sample"
  },
  "FindAllProducts": {
    "type": "list_cons",
    "func": productRepository.findProductByString
  },
  'None': {
    "type": "none",
    "func": "none"
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
    let functionCalled;
    let data;
    functionCalled = mapping[match[1]];
    if (match[1] == "FindAllProducts") {
      data = await functionCalled.func(match[2]);
      console.log(match[2])
    }
    else if (match[1] == "FindListedProduct") {
      const user_id = await userRepository.getUserByEmail(email)
      data = await functionCalled.func(user_id);
      console.log(data)
    }
    else {
      data = null
    }
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
