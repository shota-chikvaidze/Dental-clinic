const express = require('express')
const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    speciality: { type: String }
})

module.exports = mongoose.model('Doctor', doctorSchema)