import { Route, Routes } from 'react-router-dom';
import React from 'react';

const RouteCollection = () => {
    return (
        <Routes>
            <Route exact path="/post/:id"></Route>
            <Route exact path="/profile/:username"></Route>
            <Route exact path="/search"></Route>
            <Route exact path="/store"></Route>
            <Route exact path="/notifications"></Route>
            <Route exact path="/messages"></Route>
            <Route exact path="/messages/new"></Route>
            <Route exact path="/messages/:id"></Route>
            <Route exact path="/login"></Route>
            <Route exact path="/"></Route>
        </Routes>
    );
}

export default RouteCollection;
