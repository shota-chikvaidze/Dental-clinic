const booking = require('../model/booking')
const User = require('../model/user')
const Contact = require('../model/contact')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.loginAdmin = async (req, res) => {
  try{

    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(400).json({message: 'all fields required'})
    }

    const user = await User.findOne({ username, role: "ADMIN" })
    if(!user) {
      return res.status(404).json({message: 'user not found'})
    }

    const compare = await bcrypt.compare(password, user.password)
    if(!compare) {
      return res.status(400).json({message: 'password incorrect'})
    }

    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role 
      },
      process.env.JWT,
      { expiresIn: '2d' }
    );

    res.status(200).json({message: 'logged in', token})

  }catch(err){
    res.status(500).json({ message: "Server error" });
  }

};


exports.allAppointment = async (req, res) => {
  try {
    const allAppointment = await booking.countDocuments();
    res.status(200).json({ appointments: allAppointment });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.status(200).json({ users });
  } catch (err) {
    console.error("შეცდომა userCount-ში:", err);
    res.status(500).json({ message: "შეცდომა მომხმარებლების დათვლაში" });
  }
};

exports.countContact = async (req, res) => {
  try {
    const contact = await Contact.countDocuments();
    res.status(200).json({ contact });
  } catch (err) {
    console.error("შეცდომა ConnectCount-ში:", err);
    res.status(500).json({ message: "Error Counting Contacts" });
  }
};

