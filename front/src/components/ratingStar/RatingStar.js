import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './RatingStar.css'
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from 'react-icons/fa';

const RatingStars = ({ productId }) => {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

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

  
  useEffect(() => {
      const token = localStorage.getItem('token')
      try{
       const decoded = jwtDecode(token)
       setUserId(decoded.id || decoded._id)
       setIsAuthenticated(true)
      }catch(err){
        console.error("Invalid token:", err);
        setIsAuthenticated(false);
      }
  }, [])

  
  
    useEffect(() => {
       if(!userId || !productId) return;

       const localKey = `rating-${userId}-${productId}`
       const localRating = localStorage.getItem(localKey)

      if(localRating){
        setSelected(localKey)
      } else{
         const fetchUserRating = async () => {
           try{
             const res = await axios.get('http://localhost:5000/api/rating/user', {
              params: {userId, productId}
             })
             if(res.data?.value){
              setSelected(res.data.value)
              localStorage.setItem(localKey, res.data.value)
             }
           }catch(err){
            console.error("Failed to fetch user rating:", err);
           }
         }
         fetchUserRating();
      }

    }, [productId, userId])


    const handleSelect = async (star) => {
        if(!isAuthenticated){
          setErrorMessage(true)
         return;
        }

        setSelected(star)
        const localKey = `rating-${userId}-${productId}`;
        localStorage.setItem(localKey, star);

        try{
          const token = localStorage.getItem('token')
          const res = await axios.post('http://localhost:5000/api/rating', {
            productId,
            userId,
            value: star,
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setMessage(true)
        }catch(err){
          console.error("Rating failed:", err);
        }
    }

    const { t, i18n } = useTranslation()

  
  return (
    <>
      <div className="star_container">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className="star"
            color={star <= (hovered || selected) ? "#FFD700" : "#CCCCCC"}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleSelect(star)}
          />
        ))}
      </div>
        { message && (
          <div className='message_container'>
              <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '11px' : '16px' }}>{t("RateMessage")}</p>
          </div>
        )}

        { errorMessage && (
          <div className='message_container'>
              <MdErrorOutline style={{ color: 'red', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '11px' : '16px' }}>{t("RateFailedMessage")}</p>
          </div>
        )}
    </>
  );
};

export default RatingStars;