import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // If not authenticated and trying to access non-auth routes, redirect to login page
    if (!isAuthenticated && !location.pathname.includes('/signin') && !location.pathname.includes('/signup')) {
        return <Navigate to='/auth/signin' />
    }

    // If authenticated and trying to access auth pages (signin/signup), redirect to home/shop/admin depending on role
    if (isAuthenticated && (location.pathname.includes('/signin') || location.pathname.includes('/signup'))) {
        if (user?.role === "admin") {
            return <Navigate to='/admin/admindashboard' />
        } else {
            return <Navigate to='/shop/shophome' />
        }
    }

    // If authenticated but user is trying to access admin pages as a non-admin, redirect to 'unauthorized'
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to='/unauthorized' />
    }

    // If not authenticated and trying to access admin pages, redirect to 'signin'
    if (!isAuthenticated && location.pathname.includes('admin')) {
        return <Navigate to='/auth/signin' />
    }

    // If authenticated and user is an admin but trying to access shop pages, redirect to admin dashboard
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to='/admin/admindashboard' />
    }

    // If none of the above, return children (i.e., render the requested page)
    return children;
}

export default CheckAuth;
