import React, { useEffect, useState } from 'react';
import './AdminAppoiment.css';
import AdminSideBar from '../adminSideBar/AdminSideBar';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        'http://localhost:5000/api/admin/dashboard/getAppointment',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setAppointments(res.data.booking || []);
    } catch (err) {
      console.log('შეცდომა ვიზიტების მიღებისას:', err);
    }
  };

  return (
    <div className="admin-appointments-container">
      <AdminSideBar />
      <div className="admin-appointments-content">
        <h2>დაჯავშნილი ვიზიტები</h2>
        {appointments.length > 0 ? (
          <ul className="appointments-list">
            {appointments.map((a, index) => (
              <li key={index} className="appointment-item">
                <p><strong>პაციენტი:</strong> {a.name} {a.lastname}</p>
                <p><strong>ელფოსტა:</strong> {a.email}</p>
                <p><strong>სერვისი:</strong> {a.service}</p>
                <p><strong>ტელეფონი:</strong> {a.phone}</p>
                <p><strong>სპეციალისტი:</strong> {a.doctor}</p>
                <p><strong>თარიღი და დრო:</strong> {new Date(a.date).toLocaleDateString()} / {a.time}</p>
                <p><strong>სტატუსი:</strong> {a.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>დაჯავშნილი ვიზიტები ჯერ არ არსებობს.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;