import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import './index.css';

function PathRoutes() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<App/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default PathRoutes;


