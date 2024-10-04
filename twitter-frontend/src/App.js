import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteCollection from './pages/RouteCollection';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouteCollection />
      </div>
    </BrowserRouter>
  );
}

export default App;
