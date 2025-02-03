const mongoose = require("mongoose")
const SchemaTypes = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone_no: {
        type: Number,
        require: true
    },
    cart: {
        type:SchemaTypes.ObjectId,
        ref: "Cart",
        required: true
    }
})

const user = mongoose.model("User", userSchema)
module.exports = {
  user
}
