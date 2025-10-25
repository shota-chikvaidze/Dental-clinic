import React, { useState } from 'react';
import axios from 'axios';
import './SendEmail.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
     e.preventDefault()
     setLoading(true)
     try{
       const res = await axios.post('http://localhost:5000/api/reset-password', { email })
       setMessage(res.data.message)
     }catch(err){
      setMessage(err.response?.data?.message || 'Something went wrong')
     }finally{
      setLoading(false)
     }
  }


  return (
    <div className="forgot-password-container">
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{loading ? 'Loading...' : 'Send Reset Link'}</button>
      {message && <p>{message}</p>}
    </form>
  </div>
  );
}