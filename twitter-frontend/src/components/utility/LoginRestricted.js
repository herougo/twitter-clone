import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';


const LoginRestricted = ({children}) => {
    const {user} = useContext(UserContext);

    if (!user) {
        return <Navigate to="/welcome"></Navigate>
    }

    return children;
}

export default LoginRestricted;
