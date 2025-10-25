const Booking = require('../model/booking');

exports.booking = async (req, res) => {
    const { name, date, time, lastname, phone, service, email, doctor } = req.body;

    if (!name || !date || !time || !lastname || !phone || !service || !email || !doctor) {
      return res.status(400).json({ message: "all fields required" });
    }

    try {
      const isTaken = await Booking.findOne({ date, time });
      if (isTaken) {
        return res.status(409).json({ message: 'This time slot is already booked' });
      }
      const newAppointment = new Booking({ name, date, time, lastname, phone, service, email, doctor });
      await newAppointment.save();

      res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (err) {
      res.status(400).json({ message: "Error Appointment", error: err.message });
    }

}

exports.getBooking = async (req, res) => {
    try{
       const booking = await Booking.find().sort({createdAt: -1})
       res.status(200).json({booking})
    }catch(err){
       res.status(500).json({message: "Error Get Booking", error: err.message})
    }
}

exports.getBookedSlots = async (req, res) => {
    const { date } = req.query;
    
    try {
      let query = {};
      if (date) {
        query.date = date;
      }
    
      const bookings = await Booking.find(query).select('date time -_id');
      res.status(200).json({ bookings });
    } catch (err) {
      res.status(500).json({ message: "Error fetching booked slots", error: err.message });
    }
};