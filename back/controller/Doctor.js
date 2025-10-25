const express = require('express')
const Doctor = require('../model/doctor')


exports.addDoctor = async (req, res) => {
    const { name, speciality } = req.body

    try{

        if(!name) {
            return res.status(400).json({message: "all fields required"})
        }
        
        const newDoctor = await Doctor.create({ name, speciality })
        res.status(201).json({message: "doctor added seccessfuly"})

    }catch(err){
        res.status(500).json({message: "error adding doctor", error: err.message})
    }
}


exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({message: 'Error fetching doctors', error: err.message});
    }
}