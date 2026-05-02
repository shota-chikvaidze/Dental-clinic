import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Users, CalendarCheck, Mail, } from 'lucide-react';
import './Admin.css';
import AdminAppointments from '../../components/adminAppoinments/AdminAppointments';
import AdminContact from '../../components/adminContact/AdminContact';
import { Link } from 'react-router-dom';

import AdminSideBar from '../../components/adminSideBar/AdminSideBar';

export const Admin = () => {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [userRes, appointmentRes, contactRes] = await Promise.all([
        axios.get(
          '/admin/dashboard/userStats',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        axios.get(
          '/admin/dashboard/appointment',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        axios.get(
          '/admin/dashboard/contact',
          {
            headers: { Authorization: `Bearer ${token}` }, 
          }
        ),
      ]);

      setUserCount(userRes.data.users);
      setAppointmentCount(appointmentRes.data.appointments);
      setContactCount(contactRes.data.contact);
      
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const renderBar = (label, count, gradient, Icon, link) => {
    const content = (
      <div className="statCard">
        <div className="statHeader">
          <div className="statIcon" style={{ background: `linear-gradient(to top right, ${gradient})` }}>
            <Icon className="stat_icon_icon" />
          </div>
          <h3 className="statLabel">{label}</h3>
        </div>

        <div className="barContainer group">
          <div className="barTooltip">
            {label}: {count}
          </div>
          <div
            className="barFill"
            style={{
              height: `${Math.min(count * 8, 200)}px`,
              background: `linear-gradient(to top, ${gradient})`,
            }}
          />
        </div>

        <div className="text-xl font-bold text-gray-700">{count}</div>
      </div>
    )

    return link ? <Link to={link}>{content}</Link> : content;
  }

  return (
    <section className="dashboardSection">
     
       <AdminSideBar />

      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Welcome, {username}</h1>
          <p className="dashboardSubtitle">Here is your latest dashboard summary</p>
        </div>

        <div className="statsGrid">
          {renderBar('Website Users', userCount, '#34d399, #059669', Users)}
          {renderBar('Appointments', appointmentCount, '#818cf8, #6366f1', CalendarCheck, '/admin/dashboard/appointments')}
          {renderBar('Contacts', contactCount, '#facc15, #eab308', Mail, '/admin/dashboard/contacts')}
        </div>
      </div>
    </section>
  );
};