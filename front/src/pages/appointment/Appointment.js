import React, { useState, useEffect } from 'react';
import './Appointment.css';
import servicesData from '../../data/servicesData/ServicesData';
import axios from '../../api/axios';
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';

export const Appointment = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    time: '', 
    service: '',
    doctor: '',
  });

  const [message, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)


  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const res = await axios.get('/appointments/booked-slots');
        setBookedSlots(res.data.bookings);
        console.log('Booked slots:', res.data.bookings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookedSlots();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const slotsForDate = bookedSlots.filter(slot => slot.date === value);
      console.log('Booked times for selected date:', slotsForDate);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        '/appointments/book',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          date: '',
          time: '', 
          service: '',
          doctor: ''
        });
        setMessage(true)
      }
      
    } catch (err) {
      setErrorMessage(true)
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [doctors, setDoctors] = useState([]);

  const getDoctor = async () => {
    try{

      const res = await axios.get('/doctor/get-doctor')
      setDoctors(res.data)
      
    }catch(err){
      console.log('doctor error')
    }
  }

  useEffect(() => {
    getDoctor();
  }, []);

  const availableTimeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',  
    '16:00',
    '17:00',
  ];

  const getService = async () => {

    try{

      const res = await axios.get('/service')
      setService(res.data.getService)

    }catch(err){
      console.log('service error')
    }

  }

  useEffect(() => {
    getService();
  }, []);

  const { t, i18n } = useTranslation();


  return (
    <section className='appointment_sect'>
      <div className='appointment_container'>
        <h2>{t("RequestAppointmentTitle")}</h2>
        <form onSubmit={handleSubmit} className='appointment_form'>
          
          <div className='inputes-div'>
            <div className='input-div'>
              <input
                type='text'
                name='name'
                placeholder={t("appointmentName")}
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type='text'
                name='lastname'
                placeholder={t("appointmentLastName")}
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>

            <div className='input-div'>
              <input
                type='email'
                name='email'
                placeholder={t("appointmentEmail")}
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type='tel'
                name='phone'
                placeholder={t("contactPhone")}
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
              
            <div className='input-div'>
            
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, date: value });
                
                  const slotsForDate = bookedSlots.filter(slot => slot.date === value);
                  console.log('Booked times for selected date:', slotsForDate);
                }}
              />

              <select name="doctor" value={formData.doctor} onChange={handleChange} required className='doctor_input'>
                <option value="">Choose a doctor</option>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc.name}>
                    {doc.name} — {doc.speciality}
                  </option>
                ))}
              </select>

            </div>

            <div className="time_slots">
              <div className="time_slot_list">
                {availableTimeSlots.map((slot) => {
                  const isBooked = bookedSlots.some(
                    (b) => b.date === formData.date && b.time === slot
                  );
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      className={`time_slot ${isBooked ? 'booked' : ''} ${formData.time === slot ? 'active' : ''}`}
                      onClick={() => {
                        if (!isBooked) {
                          setFormData({ ...formData, time: slot });
                        }
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <h1> {t("chooseServices")} </h1>
          <div className='service_selection'>
            {servicesData.map((serviceApp, index) => (
              <div
                key={index}
                className={`appointment_item ${
                  formData.service === serviceApp.name ? 'active' : ''
                }`}
                onClick={() =>
                  setFormData({ ...formData, service: serviceApp.name })
                }
              >
                <img src={serviceApp.image} alt={serviceApp.name} />
                <p>{t(serviceApp.name)}</p>
              </div>
            ))}
          </div>

          <div className='button_loadin_container'>
            <button type='submit' disabled={loading} className='appointment_form_button'>
              {loading ? t("RequestBTnLoading") : t("RequestBTn")}
            </button>
          </div>
        </form>
      </div>

        { message && (
          <div className='message_container'>
              <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '13px' : '16px' }}>{t("MessageApp")}</p>
          </div>
        )}

        { errorMessage && (
          <div className='message_container'>
              <MdErrorOutline style={{ color: 'red', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '12px' : '16px' }}>{t("errorMessageApp")}</p>
          </div>
        )}
    </section>
  );
};
