import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logout from './Logout';

const Navbar = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Opdater token og rolle ved ruteskift
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">MinutRens</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {token && role === 'user' && (
              <>
               <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings">Dine bookinger</Link>
                </li>
              </>
            )}

            {token && role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings/admin">Alle bookinger</Link>
              </li>
            )}

            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {!token ? (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">Login</Link>
              </li>
            ) : (
              <Logout />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;