import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteCollection from './pages/RouteCollection';
import UserContext from './context/userContext';

function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <div className="App">
          <RouteCollection />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
