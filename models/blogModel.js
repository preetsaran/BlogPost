const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    heading: {
        type: String
    },
    description: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tags: {
        type: Array,
        "default": []
    }
})

module.exports = mongoose.model("Blogs", blogSchema);