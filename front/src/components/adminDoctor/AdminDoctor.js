import axios from '../../api/axios'
import React, { useState } from 'react'
import AdminSideBar from '../adminSideBar/AdminSideBar';

import './AdminDoctor.css'

const AdminDoctor = () => {

    const [doctorForm, setDoctorForm] = useState({
        name: '',
        speciality: ''
    })

    const handleChange = (e) => {
        setDoctorForm({...doctorForm, [e.target.name]: e.target.value})
    }

    const handlePost = async (e) => {
        e.preventDefault()
        try{

            const token = localStorage.getItem('adminToken')
            const res = await axios.post('/doctor/post-doctor', doctorForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 201){
                setDoctorForm({name: '', speciality: ''})
            }

        }catch(err){
            console.error(err)
        }
    }

  return (
    <section className='admin_doctor'>
        <AdminSideBar />
        <form onSubmit={handlePost}>
            <input name='name' type='text' placeholder='Doctor name' value={doctorForm.name} onChange={handleChange} required />
            <input name='speciality' type='text' placeholder='Doctor speciality' value={doctorForm.speciality} onChange={handleChange} required />
            <button type='submit'>Post</button>
        </form>
    </section>
  )
}

export default AdminDoctor