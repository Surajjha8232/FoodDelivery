const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("User", UserSchema);