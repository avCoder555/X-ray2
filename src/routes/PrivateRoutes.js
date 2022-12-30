import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
const PrivateRoutes = () => {
  let auth = localStorage.getItem('auth')
  // localStorage.setItem('auth', auth.token);
  return (
    auth ==='true' ? <><Layout /></> : <Navigate to='/login' />
  )
}
export default PrivateRoutes;