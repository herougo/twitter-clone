import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './assets/global.css';
import RouteCollection from './pages/RouteCollection';
import UserContext from './context/UserContext';

function App() {
    const [user, setUser] = useState(null);
    
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
