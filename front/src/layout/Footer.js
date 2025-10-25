import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TfiEmail } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {

  const { t } = useTranslation();

  return (
    <>
      <footer>
        <div className='footer_container'>
            <div className='footer_responsive'>

                <div className='footer_clinic_Location'>
                    <div className='footer_clinic_Location_item'>
                        <span> <TfiEmail className='contact_us_icon'/> </span>
                        <div className='footer_clinic_Location_item_email'>
                            {t("FooterMail")} <br />
                            <span>DentalClinics@gmail.com</span>
                        </div>
                    </div>

                    <div className='footer_clinic_Location_item'>
                        <span> <FaPhoneAlt className='contact_us_icon'/> </span>
                        <div className='footer_clinic_Location_item_email'>
                            {t("FooterPhone")} <br />
                            <span>3200-123-456</span>
                        </div>
                    </div>

                    <div className='footer_clinic_Location_item'>
                        <span> <IoLocationOutline className='contact_us_icon'/> </span>
                        <div className='footer_clinic_Location_item_email'>
                            {t("FooterLocationName")} <br />
                            <span>{t("FooterLocation")}</span>
                        </div>
                    </div>

                </div>

                <div className='footer_quick_links'>
                    <div className='quick_links'>
                        <h3>{t("QuickLinks")}</h3>
                        <ul className='quick_links_list'>
                            <Link to='/services' ><li className='footer_list'> {t("Link1")} </li></Link>
                            <Link to='/'><li className='footer_list'>{t("review")}</li></Link>
                            <Link to='/contact' ><li className='footer_list'> {t("Link3")} </li></Link>
                            <Link to='/gallery' ><li className='footer_list'> {t("Link4")} </li></Link>
                        </ul>
                    </div>
                    <div className='follow_us'>
                        <h3>{t("FollowUS")}</h3>
                        <div className='icon_container'>
                            <FaFacebookF className='footer_web_icon'/>
                            <FaTwitter className='footer_web_icon'/>
                            <FaInstagram className='footer_web_icon'/>
                        </div>
                    </div>
                </div>
            </div>


            <div className='clinic_hours'>
                <h3>{t("Hours")}</h3>
                <div className='clinic_hours_container'>
                    <div>
                        <span>{t("mon-fri")}</span>
                        <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div>
                        <span>{t("Sat")}</span>
                        <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div>
                        <span> {t("Sun")} </span>
                        <span> {t("Closed")} </span>
                    </div>
                </div>
            </div>

        </div>
      </footer>
    </>
  )
}

export default Footer
