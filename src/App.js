import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/style.css';
import Home from './pages/home';
import TopPicks from './pages/top-picks';

import ReactGA from 'react-ga';

const App = () => {
  useEffect(() => {
    ReactGA.initialize('G-27ESG3M8V8');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
