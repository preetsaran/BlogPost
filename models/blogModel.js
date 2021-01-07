const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date is required field"]
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