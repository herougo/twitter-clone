import { Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginRestricted from '../components/utility/LoginRestricted';
import WelcomePage from './welcome/WelcomePage';

const RouteCollection = () => {
    return (
        <Routes>
            <Route exact path="/post/:id"></Route>
            <Route exact path="/profile/:username" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/search" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/store" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/notifications" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/messages" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/messages/new" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/messages/:id" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/" element={
                <LoginRestricted>

                </LoginRestricted>
            }></Route>
            <Route exact path="/welcome" element={
                <WelcomePage></WelcomePage>
            }></Route>
        </Routes>
    );
}

export default RouteCollection;
