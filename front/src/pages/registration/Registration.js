import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Registration.css'
import { useTranslation } from 'react-i18next';

import { MdErrorOutline } from "react-icons/md";
import { FaUser } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

export const Registration = () => {

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

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    year: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);
      
      
      if(res) {
        setMessage(true)
        window.location.href = '/';
        localStorage.setItem('token', res.data.token);
      }
        
    } catch (err) {
      setErrorMessage(true)
      console.error("Registration error:", err);
    }
  }

  const { t, i18n } = useTranslation()

  return (

      <section className='registration_section'>

        <div className='registratio_container'>
          <div className='signin_cotext_side'>
            <div className='signin_cotext_side_title'>
              <h3> {t("welcome")} </h3>
            </div>
            <div className='signin_cotext_side_paragraph'>
              <p> {t("haveAccount")} </p>
            </div>
            <div className='signin_cotext_side_button'>
              <Link to='/login' ><button> {t("login")} </button></Link>
            </div>
            <div className='signin_cotext_side_button'>
              <Link to='/admin-login' ><button> {t("forAdmin")} </button></Link>
            </div>  
          </div>

          <div className='signin_form_side'>

            <form onSubmit={handleSubmit} className='registration_form'>
              <h3> {t("Signup")} </h3>
              <div>
                <input name='name' type='text' placeholder={t("SignupName")} onChange={handleChange} value={form.name} className='inpit'/><br />
                <FaUser className='icon' />
              </div>
              <div>
                <input name='lastname' type='text' placeholder={t("SignupLastName")} onChange={handleChange} value={form.lastname} />
                <FaUserAlt />
              </div>
              <div>
                <input name='username' type='text' placeholder={t("SignupUsername")} onChange={handleChange} value={form.username} />
                <FaUserCircle />
              </div>
              <div>
                <input name='email' type='email' placeholder={t("SignupEmail")} onChange={handleChange} value={form.email} />
                <MdEmail />
              </div>
              <div>
                <input name='password' type='password' placeholder={t("SignupPassword")} onChange={handleChange} value={form.password} />
               <RiLockPasswordLine />
              </div>
              <div>
                <input name='phone' type='text' placeholder={t("SignupPhone")} onChange={handleChange} value={form.phone} />
                <FaPhoneAlt />
              </div>
              <div>
                <input name='year' type='number' placeholder={t("SignupYear")} onChange={handleChange} value={form.year} />
                <FaRegCalendarAlt />
              </div>
              <span className='registration_button_container'>
                <button type='submit'> {t("SignupSubmit")} </button>
              </span>
            </form>
          </div>
        </div>
        { message && (
          <div className='message_container'>
              <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '13px' : '16px' }}>{t("RegisterMessage")}</p>
          </div>
        )}

        { errorMessage && (
          <div className='message_container'>
              <MdErrorOutline style={{ color: 'red', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '12px' : '16px' }}>{t("RegisterErrorMessage")}</p>
          </div>
        )}
      </section>
  );
}













