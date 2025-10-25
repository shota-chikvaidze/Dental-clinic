import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../adminSideBar/AdminSideBar';
import './AdminSchedule.css';

const AdminSchedule = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('adminToken'); 
        const res = await axios.get('http://localhost:5000/api/admin/dashboard/getAppointment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data.booking || []);
      } catch (err) {
        console.error('Error fetching schedule:', err);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="admin-schedule-container">
      <AdminSideBar />
      <div className="admin-schedule-content">
        <h2>Appointment Schedule</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.name} {a.lastname}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminSchedule;
