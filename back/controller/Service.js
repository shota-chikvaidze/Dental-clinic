const Service = require('../model/service')

exports.addService = async (req, res) => {
    try{

        const { title, description, image } = req.body
        if(!title || !description ||image){
            return res.status(404).json({message: 'all fields required'})
        }

        const service = await Service.create({
            title,
            description,
            image
        })

        res.status(201).json({message: 'service created successfully', service})


    }catch(err){
        res.status(500).json({message: 'error adding service'})
    }
}

exports.getService = async (req, res) => {

    try{

        const getService = await Service.find()
        res.status(200).json({message: 'service received successfuly', getService})

    }catch(err){
        res.status(500).json({message: 'error getting service'})
    }

}