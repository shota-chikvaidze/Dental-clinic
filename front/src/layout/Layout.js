import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import { useTranslation } from "react-i18next";
import { isLoggedIn, logout } from '../auth'
import { GrLanguage } from "react-icons/gr";

import UkFlag from '../assets/images/download.jpg'
import { PiSignIn } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";

const Layout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [menuOpen, setMenuOpen] = useState(false); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <header>
        <div className='container'>
          <div className='logo_and_menu_icon'>
            <Link to='/' className='logo_link'>
              <h1>{t("weblogo")}</h1>
            </Link>
            <div className='menu_icon' onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu />
            </div>
          </div>

          <ul className={`header_menu ${menuOpen ? 'show_menu' : ''}`}>
            <Link to='/'><li className='menu_list'>{t("review")}</li></Link>
            <Link to='/services'><li className='menu_list'>{t("services")}</li></Link>
            <Link to='/contact'><li className='menu_list'>{t("contact")}</li></Link>
            <Link to='/gallery'><li className='menu_list'>{t("gallery")}</li></Link>
          </ul>

          <div className='header_right'>
            <div className='language'>
              <GrLanguage />
              <select onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">En</option>
                <option value="ge">Ge</option>
              </select>
            </div>

            <div className='request_appointment_btn'>
              <Link to='/appointment'>
                <button>{t("appointmentBtn")}</button>
              </Link>
            </div>

            {
              loggedIn ? (
                <button onClick={() => { handleLogout(); navigate('/'); }} className='log_out_btn'>Log out</button>
              ) : (
                <Link to='/registration' className='login_link'>
                  <PiSignIn className='login_icon' />
                </Link>
              )
            }
          </div>
        </div>
      </header>
    </>
  );
};

export default Layout;
