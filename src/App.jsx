import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Candidates from './Pages/Candidates';
import Portal from './Pages/Portal';
import Applications from './Pages/Applications';
import Applicants from './components/applications/Applicants';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Auth from './components/auth/Auth';
import { NineFiveContextAdmin } from './store/AppContext';
import { LuLogOut } from 'react-icons/lu';
import SplashScreen from './components/splashscreen/splashScreen';

const App = () => {
  const { authUser  , logoutUser   } = useContext(NineFiveContextAdmin);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplashScreen = localStorage.getItem('hasSeenSplashScreen');
    if (!hasSeenSplashScreen) {
      const timer = setTimeout(() => {
        localStorage.setItem('hasSeenSplashScreen', 'true');
        setShowSplash(false);
      }, 4000);
      
      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        authUser   ? (
          <>
            <LuLogOut className="log-out" size={20} onClick={logoutUser  } />
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Candidates />} />
              <Route path="/portal" exact element={<Portal />} />
              <Route path="/applications" exact element={<Applications />} />
              <Route path="/applications/applicants" exact element={<Applicants />} />
            </Routes>
          </>
        ) : (
          <Auth />
        )
      )}
      <Toaster />
    </>
  );
};

export default App;