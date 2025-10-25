import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ServiceData from '../../data/servicesData/ServicesData'
import './ServiceDetails.css'
import { useTranslation } from 'react-i18next';

const ServicesDetails = () => {
    
  const { id } = useParams()
  const ServiceDetails = ServiceData.find(p => p.id === Number(id));
  
  const { t } = useTranslation();

  return (
    <>
      <section className='service_details_sect'>
        <div className='service_details_container'>
          <div className='service_details_item'>
              <img src={ServiceDetails.image} />
              <div className='service_details_context'>
                <h1> {t(ServiceDetails.name)} </h1>
                <p> {t(ServiceDetails.longDescription)} </p>
                <h5>{t("price")}: <span> {ServiceDetails.price} </span> </h5>
                <button>
                  <Link to='/appointment' className='service_btn_link'>{t("reservationBtn")}</Link>
                </button>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesDetails
