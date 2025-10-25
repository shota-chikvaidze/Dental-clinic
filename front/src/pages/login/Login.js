import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './Login.css';

import { LiaFacebookF } from "react-icons/lia";
import { FaGoogle, FaGithub, FaLinkedinIn, FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { t } from 'i18next';

export const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post('/users/login', form);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className='user_signin_sect'>
      <div className='signin_container'>
        <div className='signin_cotext_side'>
          <div className='signin_cotext_side_title'>
            <h3> {t("welcome")} </h3>
          </div>
          <div className='signin_cotext_side_paragraph'>
            <p> {t("dontHaveAccount")} </p>
          </div>
          <div className='signin_cotext_side_button'>
            <Link to='/registration'><button> {t("Register")} </button></Link>
          </div>
        </div>

        <div className='signin_form_side'>
          <form onSubmit={handleSubmit}>
            <div className='signin_form_title'>
              <h1> {t("login")} </h1>
            </div>
            <div className='signin_form_input_div'>
              <div>
                <input name='username' type='text' placeholder={t("SignupUsername")} onChange={handleChange} required />
                <FaUser />
              </div>
              <div>
                <input name='password' type='password' placeholder={t("SignupPassword")} onChange={handleChange} required />
                <FaLock />
              </div>
            </div>
            <div>
              <Link to='/reset-password' className='signin_form_foergot_password'> {t("ForgotPass")} </Link>
            </div>
            <div className='signin_form_login_button'>
              <button type='submit' disabled={loading}>
                {loading ? t("Logging") : t("login")}
              </button>
            </div>
            <div className='login_with_social'>
              <p>  {t("socialPlatform")} </p>
            </div>
            <div className='signin_form_social_button'>
              <button type="button"><LiaFacebookF /></button>
              <button type="button"><FaGoogle /></button>
              <button type="button"><FaGithub /></button>
              <button type="button"><FaLinkedinIn /></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};