import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Standings from './pages/Standings';
import Performance from './pages/Performance';

function PathRoutes() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Standings />} />
          <Route path=":teamName-performance" element={<Performance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default PathRoutes;


