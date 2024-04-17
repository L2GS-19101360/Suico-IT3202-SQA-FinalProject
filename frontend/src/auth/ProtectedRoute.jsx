import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => (
    <Route {...rest} render={(props) => {
        const userRole = localStorage.getItem('role');
        if (userRole === role) {
            return <Component {...props} />;
        } else {
            switch (userRole) {
                case 'user':
                    return <Redirect to='/UserDashboard' />;
                case 'librarian':
                    return <Redirect to='/LibrarianDashboard' />;
                case 'admin':
                    return <Redirect to='/AdminDashboard' />;
                default:
                    return <Redirect to='/LoginPage' />;
            }
        }
    }} />
);

export default ProtectedRoute;