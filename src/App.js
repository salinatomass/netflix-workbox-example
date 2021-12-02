import React from 'react';
// import { Router } from '@reach/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import './styles/style.css';
import TopPicks from './pages/top-picks';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/top-picks" element={<TopPicks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
