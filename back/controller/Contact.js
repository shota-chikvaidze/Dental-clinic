const Contact = require('../model/contact')

exports.postContacts = async (req, res) => {
    const {email, name, lastname, phone, message} = req.body     
    try{
        if(!name || !lastname || !email || !phone || !message) {
            return res.status(400).json({message: "all fields required"})
        }
        const contact = await Contact.create({
            name, lastname, email, message, phone
        })
        res.status(201).json({message: "message sent successfuly"})
     }catch(err){
        console.error("Error saving contact:", err);
        res.status(500).json({message: "Failed sending message"})
     }
}

exports.getContacts = async (req, res) => {
     try{
        const contacts = await Contact.find().sort({createdAt: -1})
        res.status(200).json({contacts})
     }catch(err){
        console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
     }
}