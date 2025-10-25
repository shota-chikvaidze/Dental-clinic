import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Services.css'
import ServiceData from '../../data/servicesData/ServicesData'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import servicesMainImg from '../../assets/images/servicesMainImg.png'


export const Services = () => {

  const { t } = useTranslation();

  const fetchServices = async (params) => {
    
  }

  return (
    <>
      <section className='services_main_section'>
        <img src={servicesMainImg} />
      </section>
      <section className='services_section'>
        <h1> {t("servicesTitle")} </h1>

        <div className='services_container'>
          {ServiceData.map((service) => (
            <Link to={`/services/${service.id}`} >
            
            <div className="service_card" key={service.id}>
              <img src={service.image} alt={service.name} className="service-image" />
              <h2 className="service-name">{t(service.name)}</h2>
              <p className="service-description">{t(service.description)}</p>
            </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}