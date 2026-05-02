import React, { useEffect, useState } from 'react';
import './AdminContact.css';
import AdminSideBar from '../adminSideBar/AdminSideBar';
import axios from '../../api/axios';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        '/admin/dashboard/getContact',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setContacts(res.data.contacts || []);
    } catch (err) {
      console.log('დატვირთვის შეცდომა:', err);
      setContacts([]);
    }
  };

  return (
    <div className="admin-contact-container">
      <AdminSideBar />
      <div className="admin-contact-content">
        <h2>კონტაქტის შეტყობინებები</h2>
        {contacts.length > 0 ? (
          <ul className="contact-list">
            {contacts.map((c, index) => (
              <li key={index} className="contact-item">
                <p><strong>გამგზავნი:</strong> {c.name} {c.lastname} ({c.email})</p>
                <p><strong>ტელეფონი:</strong> {c.phone}</p>
                <p><strong>შეტყობინება:</strong> {c.message}</p>
                <p><strong>თარიღი:</strong> {new Date(c.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>შეტყობინებები ჯერ არ არის.</p>
        )}
      </div>
    </div>
  );
};

export default AdminContact;