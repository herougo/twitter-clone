import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';


const LoginRestrictedRoute = ({path, exact, children}) => {
    const user = useContext(UserContext);

    if (!user) {
        return <Redirect to="/welcome"></Redirect>
    }

    return (
        <Route path={path} exact={exact}>
            {children}
        </Route>
    );
}

export default LoginRestrictedRoute;
