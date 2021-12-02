import React from 'react';
import IfOnline from './IfOnline.js';
import Header from './header';
import Hero from './hero';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Hero />
      <IfOnline />
      <div className="max-w-screen-xl m-auto mt-12">{children}</div>
    </div>
  );
};

export default Layout;
