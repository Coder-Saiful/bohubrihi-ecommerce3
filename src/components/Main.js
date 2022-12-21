import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import Home from './Home/Home';
import PageNotFound from './PageNotFound';
import AdminRoute from './protectedRoutes/AdminRoute';
import PrivateRoute from './protectedRoutes/PrivateRoute';
import Dashboard from './user/Dashboard';
import Login from './user/Login';
import Register from './user/Register';

const Main = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/user/dashboard'>
                <Dashboard />
            </PrivateRoute>
            <AdminRoute path='/admin/dashboard'>
                <AdminDashboard />
            </AdminRoute>
            <Route component={PageNotFound} />
        </Switch>
    );
};

export default Main;