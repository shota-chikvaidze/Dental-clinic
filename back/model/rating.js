const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    value: Number
})

module.exports = mongoose.model("Rating", ratingSchema);