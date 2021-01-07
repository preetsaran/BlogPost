const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required field"]
    },
    username: {
        type: String,
        required: [true, "Username is required field"],
        unique: true
    },
    age: {
        type: Number,
        required: [true, "Age is required field"]
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required field"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required field"]
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("user", userSchema);