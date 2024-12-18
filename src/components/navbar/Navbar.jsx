import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { NineFiveContextAdmin } from '../../store/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(NineFiveContextAdmin);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: path });
  }, [location, dispatch]);

  return (
    <nav className="navbar">
      <Link to="/" className={state.activePage === '' ? 'navbar-btn-active' : 'navbar-btn'}>
        Candidates
      </Link>
      <Link to="/portal" className={state.activePage === 'portal' ? 'navbar-btn-active' : 'navbar-btn'}>
        Portal
      </Link>
      <Link to="/applications" className={state.activePage === 'applications' ? 'navbar-btn-active' : 'navbar-btn'}>
        Applications
      </Link>
    </nav>
  );
};

export default Navbar;