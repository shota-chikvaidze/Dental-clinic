const mongodb = require('mongoose')

const userSchema = new mongodb.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    year: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    resetToken: {type: String},
    resetTokenExpire: {type: Date}
})

module.exports = mongodb.model("User", userSchema)