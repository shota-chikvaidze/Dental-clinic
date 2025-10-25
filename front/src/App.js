import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Registration } from './pages/registration/Registration'
import { Services } from './pages/services/Services'
import { Contact } from './pages/contact/Contact'
import { Gallry } from './pages/gallery/Gallry'
import { Appointment } from './pages/appointment/Appointment'
import { Admin } from './pages/admin/Admin'
import Layout from './layout/Layout'
import Footer from './layout/Footer'
import ServicesDetails from './components/servicesDetails/ServicesDetails';
import AdminAppointments from './components/adminAppoinments/AdminAppointments'
import AdminContact from './components/adminContact/AdminContact'
import ResetPassword from './components/resetPassword/ResetPassword';
import ForgotPassword from './components/sendEmail/SendEmail';
import AdminPrivateRoute from './components/adminPrivateRoute/AdminPrivateRoute';
import AdminLogin from './pages/adminLogin/AdminLogin';
import AdminSchedule from './components/adminSchedule/AdminSchedule'
import AdminDoctor from './components/adminDoctor/AdminDoctor'

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path='/' element={ <Home /> } /> 
        <Route path='/login' element={ <Login /> } /> 
        <Route path='/registration' element={ <Registration /> } /> 
        <Route path='/services' element={ <Services /> } /> 
        <Route path='/services/:id' element={ <ServicesDetails /> } />
        <Route path='/contact' element={ <Contact /> } /> 
        <Route path='/gallery' element={ <Gallry /> } />
        <Route path='/appointment' element={ <Appointment /> } />
        <Route path='/admin-login' element={ <AdminLogin /> } />

        <Route path='/admin/dashboard' element={ <AdminPrivateRoute> <Admin /> </AdminPrivateRoute> } />
        <Route path='/admin/dashboard/appointments' element={<AdminPrivateRoute> <AdminAppointments /> </AdminPrivateRoute> } />
        <Route path='/admin/dashboard/contacts' element={ <AdminPrivateRoute> <AdminContact /> </AdminPrivateRoute> } />
        <Route path='/admin/dashboard/schedule' element={ <AdminPrivateRoute> <AdminSchedule /> </AdminPrivateRoute> } />
        <Route path='/admin/dashboard/doctor' element={ <AdminPrivateRoute> <AdminDoctor /> </AdminPrivateRoute> } />


        <Route path='/reset-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
