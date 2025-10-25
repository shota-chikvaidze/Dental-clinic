const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const {name, lastname, username, email, password, phone, year} = req.body
    try{
       const existedUser = await User.findOne({
        $or: [{email}, {username}]
       })
       if(existedUser) return res.status(400).json({message: "User Already Exist"})
    
       const hashedPassword = await bcrypt.hash(password, 10)

       const user = await User.create({
         name, username, lastname, email, phone, year, password: hashedPassword
       })
       res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: "Error Register", error: err.message})
    }
}

exports.loginUser = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.findOne({username})
        if (!user) return res.status(400).json({ message: "User not found" });

       const isMatch = await bcrypt.compare(password, user.password)
       if (!isMatch) return res.status(400).json({ message: "Invalid password" });

       const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: "2d"})
       
       res.status(200).json({ message: "Login successful", token, user });
    }catch(err){
        res.status(500).json({message: "Error Login", error: err.message})
    }
}