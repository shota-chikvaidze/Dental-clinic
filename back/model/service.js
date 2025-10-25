const express = require('express')
const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    Image: { type: Object, required: true },
})

module.exports = mongoose.model('Service', serviceSchema)