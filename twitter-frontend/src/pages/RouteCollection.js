import { Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginRestrictedRoute from '../components/utility/LoginRestrictedRoute';

const RouteCollection = () => {
    return (
        <Routes>
            <LoginRestrictedRoute exact path="/post/:id"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/profile/:username"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/search"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/store"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/notifications"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/messages"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/messages/new"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/messages/:id"></LoginRestrictedRoute>
            <LoginRestrictedRoute exact path="/"></LoginRestrictedRoute>
            <Route exact path="/welcome"></Route>
        </Routes>
    );
}

export default RouteCollection;
