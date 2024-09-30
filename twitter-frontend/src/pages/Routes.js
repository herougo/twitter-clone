import { Route, Switch } from 'react-router-dom';
import React from 'react';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/post/:id"></Route>
            <Route exact path="/profile/:username"></Route>
            <Route exact path="/search"></Route>
            <Route exact path="/store"></Route>
            <Route exact path="/notifications"></Route>
            <Route exact path="/messages"></Route>
            <Route exact path="/messages/:id"></Route>
            <Route exact path="/login"></Route>
            <Route exact path="/"></Route>
        </Switch>
    );
}

export default Routes;
