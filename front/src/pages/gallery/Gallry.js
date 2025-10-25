import React, { useState } from 'react'
import './Gallery.css'
import { useTranslation } from 'react-i18next';
import GalleryData from '../../data/galleryData/GalleryData'

export const Gallry = () => {

  const [showMore, setShowMore] = useState(6 + 1)

  const showMoreFunc = () => {
    setShowMore(showMore + 6)
  } 

  const galleryDataLength = () => {
    return (GalleryData).length
  }

  const { t, i18n } = useTranslation();


  return (
    <>
      <section className='gallery_sect'>
        <h4>{galleryDataLength()} <span> {t("Images")} </span> </h4>
        <div className='gallery_container'>
            {GalleryData.slice(1, showMore).map((gallery, index) => (
                <div key={index} className='gallery_item'>
                    <img src={gallery.image} />
                </div>
            ))}
        </div>
        <button onClick={showMoreFunc} className='show_more_func'> {t("ShowMore")} </button>
      </section>
    </>
  )
}
