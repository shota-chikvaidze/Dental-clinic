import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import './Home.css';
import SliderData from '../../data/homeSliderData/HomeSliderData';
import HomeServicesData from '../../data/homeServicesData/HomeServicesData';
import HomeTeethData from '../../data/homeTeethData/HomeTeethData'
import HomeDoctorsData from '../../data/homeDoctorsData/HomeDoctorsData'
import RatingStar from '../../components/ratingStar/RatingStar'

import { TbDisabled } from "react-icons/tb";
import { FaSearchPlus } from "react-icons/fa";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa";
import { IoContrastSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export const Home = () => {

  const [slider, setSlider] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [rateDoctor, setRateDoctor] = useState(false);

  const showDisabled = () => {
    setDisabled(true);
    setRateDoctor(true)
  }
  const closeDisabled = () => {
    setDisabled(false);
    setRateDoctor(false);
  }


  const productsPerPage = 1
  const totalProducts = SliderData.length;
  const maxindex = Math.max(0, Math.ceil(totalProducts / productsPerPage) - 1)

  const nextSlide = () => {
    if(slider < maxindex) {
      setSlider(slider + 1);
    }
  }

  const precSlide = () => {
    if(slider > 0) {
      setSlider(slider - 1);
    }
  }

  const { t, i18n } = useTranslation();

  return (
    <>
      <section className="home_slider_section">
        <div className="slider_wrapper">
          <button onClick={precSlide} className="slider_btn"> <IoIosArrowBack /> </button>
      
          <div className="slider_container">
            <div
              className="slider_track"
              style={{ transform: `translateX(-${slider * 100}%)` }}
            >
              {SliderData.map((item, index) => (
                <div className="slider_item" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className='slider_content'>
                    <h3>{t(item.title)}</h3>
                    <h5>{t(item.description)}</h5>
                    <p className='slider_phone'> {item.Phone}</p>
                    <Link to={'/appointment'}><button> {t(item.button)} </button></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          <button onClick={nextSlide} className="slider_btn"> <IoIosArrowForward /> </button>
        </div>
      </section>

      <section className='home_second_section'>
        <h2>{t("HomeServicesTitle")}</h2>
        <div className='home_second_section_container'>
          {HomeServicesData.map((service, index) => (
            <div className='service_item' key={index}>
              <img src={service.Image} alt={service.title} />
              <h3>{t(service.title)}</h3>
              <p>{t(service.description)}</p>
              <div className='service_button_container'>
                <Link to='/contact' ><button>{t("ContactUsBtn")}</button></Link>  
              </div>
            </div>
          ))}
        </div>
      </section>
        
      <section className='teethGallery'>
        <h2>{t("befrAftTitle")}</h2>
        <div className='teethGallery_container'>
          {HomeTeethData.map((teeth, index) => (
            <div key={index} className='teeth_item'>
              <img src={teeth.image} alt={teeth.title} />
              <h3><span>{t("Patient")}:</span> {t(teeth.title)}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className='home_doctors_section'>
          <h2>{t("MeetDocTitle")}</h2>
          <div className='home_doctors_container'>
            {HomeDoctorsData.map((doctor, index) => (
              <div className='doctor_card' key={index}>
                <img src={doctor.image} alt={doctor.name} />
                <h3>{t(doctor.name)}</h3>
                <p className='doctor_specialty'><strong>{t("Speciality")}:</strong> {t(doctor.specialty)}</p>
                <p className='doctor_description'>{t(doctor.description)}</p>
                <div className='doctor_button_container'>
                  <RatingStar />
                </div>
              </div>
            ))}
          </div>
      </section>

      <section className='about_us_section'>
          <div className='about_us_section_container'>
            <h3>{t("WhyUSTitle")}</h3>
            
            <div className='about_us_section_content'>
              <div>
                <h4>🦷 {t("Reason1")}</h4>
                <p>{t("Reason1Para1")}</p>
              </div>
              <div>
                <h4>🌟 {t("Reason2")}</h4>
                <p>{t("Reason1Para2")}</p>
              </div>
              <div>
                <h4>🏆 {t("Reason3")}</h4>
                <p>{t("Reason1Para3")}</p>
              </div>
            </div>

          </div>
      </section>
      
      <div className='for_disabled_container'>
        <button className='for_disabled' onClick={ disabled ? closeDisabled : showDisabled }>
          <TbDisabled className='disabled_icon'/>
        </button>
      </div>
      

      {disabled && (
        <div className='disabled_container'>
          <h4>Accessibility Tools</h4>
          <div className='disabled_container_content'>
            <p> <FaSearchPlus /> Increase Text </p>
            <p> <FaMagnifyingGlassMinus /> Decrease Text </p>
            <p> <FaBarcode /> Grayscale</p>
            <p> <IoContrastSharp />  High Contrast</p>
          </div>
        </div>
      )}
    </>
  );
};
