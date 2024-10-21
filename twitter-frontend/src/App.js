import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './assets/global.css';
import RouteCollection from './pages/RouteCollection';
import UserContext from './context/UserContext';
import useCookieUser from './hooks/useCookieUser';

function App() {
    const {user, setUser} = useCookieUser();

    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <div className="App">
                    <RouteCollection />
                </div>
            </BrowserRouter>
        </UserContext.Provider>
  );
}

export default App;
