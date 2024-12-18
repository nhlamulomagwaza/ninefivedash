import React from 'react';
import './splash.css';
import {  ScaleLoader } from 'react-spinners';

const SplashScreen = () => {
  return (
    <div id="splash-screen" className="splash-screen">
      <div className="splash-content">
        <h1 className='splash-title'>NineFive Admin Dashboard</h1>
        <div className="spinner"><ScaleLoader size={40} color='white'/></div>
      </div>
    </div>
  );
};

export default SplashScreen;