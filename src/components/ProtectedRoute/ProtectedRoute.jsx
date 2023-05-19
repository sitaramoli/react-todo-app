import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCookie } from '../../utils/cookies_manager';
import Header from '../Header/Header';

const ProtectedRoute = () => {
    const { getAuthCookie } = useAuthCookie();
    const authenticated = getAuthCookie();
    return authenticated ? <><Header /><Outlet /></> : <Navigate to='/login' replace={true} />;
};
export default ProtectedRoute;