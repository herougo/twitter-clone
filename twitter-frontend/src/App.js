import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './assets/global.css';
import RouteCollection from './pages/RouteCollection';
import UserContext from './context/UserContext';
import SocketIOContext from './context/SocketIOContext';
import useCookieUser from './hooks/useCookieUser';
import useSocketIOWrapper from './hooks/useSocketIOWrapper';

function App() {
    const {user, setUser} = useCookieUser();
    const socketWrapper = useSocketIOWrapper(user);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <SocketIOContext.Provider value={socketWrapper}>
                <BrowserRouter>
                    <div className="App">
                        <RouteCollection />
                    </div>
                </BrowserRouter>
            </SocketIOContext.Provider>
        </UserContext.Provider>
  );
}

export default App;
