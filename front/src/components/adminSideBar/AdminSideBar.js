import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminSideBar.css'
import axios from '../../api/axios'

const AdminSideBar = () => {

  const [contactCount, setContactCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const [contactRes, appointmentRes] = await Promise.all([
          axios.get(
            "/admin/dashboard/contact",

            {
              headers: { Authorization: `Bearer ${token}` }, 
            }

          ),
          
          axios.get(
            "/admin/dashboard/appointment",

            {
              headers: { Authorization: `Bearer ${token}` }, 
            }

          )
        ]);

        setContactCount(contactRes.data.contact || 0);
        setAppointmentCount(appointmentRes.data.appointments || 0);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin-login';
  };

  return (
    <div className="sidebar">
        <div className="sidebar-content">
          <p className="sidebar-title">Admin Panel</p>
          <ul className="sidebar-menu">
            <li className='notification'>
              <Link to={'/admin/dashboard'} className='sidebar_link'>Dashboard</Link>
            </li>
            <li className='notification'>
              <Link to={'/admin/dashboard/appointments'} className='sidebar_link'>
                Appointments {appointmentCount > 0 && <span className="notif_badge">+{appointmentCount}</span>}
              </Link>
            </li>
            <li className='notification'>
              <Link to={'/admin/dashboard/contacts'} className='sidebar_link'>
                Contacts {contactCount > 0 && <span className="notif_badge">+{contactCount}</span>}
              </Link>
            </li>

            <li className='notification'>
              <Link to={'/admin/dashboard/schedule'} className='sidebar_link'>
                Appointment Schedule {appointmentCount > 0 && <span className="notif_badge">+{appointmentCount}</span>}
              </Link>
            </li>

            <li className='notification'>
              <Link to={'/admin/dashboard/doctor'} className='sidebar_link'>
                Post doctor
              </Link>
            </li>

            <li className='sidebar_link'>Settings</li>
            <li>
              <button onClick={handleLogout} className='admin_logout_btn'>Log out</button>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default AdminSideBar