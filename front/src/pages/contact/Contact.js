import React, { useState, useEffect } from 'react';
import './Contact.css';
import contactImg1 from '../../assets/images/contact_dental_img_3.webp';
import { useTranslation } from 'react-i18next';

import { FaLocationDot, FaPhone, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { MdErrorOutline } from "react-icons/md";
import axios from 'axios';

export const Contact = () => {

  const [message, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

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


  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:5000/api/userContact/contact', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(true)
      setResponseMessage(res.data.message);
      setFormData({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(true)
    }
  }
  
  const { t, i18n } = useTranslation();

  return (
    <>
      <section className='contact_section'>
        <img src={contactImg1} alt="Contact" />
      </section>

      <section className='contact_main_sect'>
        <div className='contact_main_container'>
          <form onSubmit={handleSubmit} className='contact_input_cont'>
            <div>
              <span>
                <label> {t("contactName")} </label>
                <input type='text' name='name' value={formData.name} onChange={handleChange} required />
              </span>
              <span>
                <label> {t("contactLastName")} </label>
                <input type='text' name='lastname' value={formData.lastname} onChange={handleChange} required />
              </span>
            </div>
            <div>
              <span>
                <label> {t("contactEmail")} </label>
                <input type='email' name='email' value={formData.email} onChange={handleChange} required />
              </span>
              <span>
                <label> {t("contactPhone")} </label>
                <input type='tel' name='phone' value={formData.phone} onChange={handleChange} required />
              </span>
            </div>
            <div>
              <span>
                <label> {t("messageLabel")} </label>
                <textarea
                  placeholder={t('messagePlaceholder')}
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </span>
            </div>
            <div className='contact_submit_btn'>
              <button type='submit'> {t("submitBtn")} </button>
            </div>
          </form>

          <div className='contact_right'>
            <div className='contact_right_content'>
              <h3> {t("Contactus")} </h3>
              <p>
                {t("ContactusText")}
              </p>
            </div>
            <div className='icons_location'>
              <span>
                <FaPhone />
                <h4>+3200 123-456</h4>
              </span>
              <span>
                <MdOutlineMail />
                <h4>dentalClinics@gmail.com</h4>
              </span>
              <span>
                <FaLocationDot />
                <h4>{t("contactLocation")}</h4>
              </span>
              <div>
                <FaFacebookF className='footer_web_icon' />
                <FaTwitter className='footer_web_icon' />
                <FaInstagram className='footer_web_icon' />
              </div>
            </div>
          </div>
        </div>
        { message && (
          <div className='message_container'>
              <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '11px' : '16px' }}>{t("Message")}</p>
          </div>
        )}

        { errorMessage && (
          <div className='message_container'>
              <MdErrorOutline style={{ color: 'red', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '11px' : '16px' }}>{t("errorMessage")}</p>
          </div>
        )}
      </section>
    </>
  );
};