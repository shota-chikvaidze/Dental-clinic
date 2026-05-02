const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


const userRouter = require('./router/UserRouter');
const bookingRouter = require('./router/BookingRouter');
const adminRouter = require('./router/AdminRouter');
const ratingRouter = require('./router/RatingRouter')
const contactRouter = require('./router/ContactRouter');
const doctorRouter = require('./router/DoctorRouter')
const serviceRouter = require('./router/ServiceRouter')

const resetPasswordRouter = require('./router/emailRouter')


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/appointments', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/userContact', contactRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/service', serviceRouter);

app.use('/api/reset-password', resetPasswordRouter)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB, {
    
}).then(() => {
    console.log("MongoDB Connected Well");
    app.listen(PORT, () => {
        console.log(`Server Running On http://localhost:${PORT}`);
    });
}).catch((err) => console.log(err));
