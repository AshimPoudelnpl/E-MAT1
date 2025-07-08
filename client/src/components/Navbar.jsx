import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosMoon, IoMdSunny } from "react-icons/io";
import { HiBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('voting-app-theme') || '');
  const token = useSelector(state => state.vote.currentVoter?.token);
  // Close nav menu on small screens when menu link is clicked
  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  const changeThemeHandler = () => {
    if (localStorage.getItem('voting-app-theme') === 'dark') {
      localStorage.setItem('voting-app-theme', '');
      setDarkTheme('');
    } else {
      localStorage.setItem('voting-app-theme', 'dark');
      setDarkTheme('dark');
    }
  };

  useEffect(() => {
    document.body.className = localStorage.getItem('voting-app-theme') || '';
  }, [darkTheme]);

  // Responsive nav toggle on window resize
  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth >= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to='/' className='text-2xl font-bold text-blue-600 dark:text-blue-400'>E-MAT</Link>
        <div className="flex items-center gap-2">
          <div
            className={
              `flex-col md:flex-row md:flex gap-6 font-medium text-gray-700 dark:text-gray-200 ` +
              (showNav
                ? 'flex absolute md:static top-16 left-0 w-full md:w-auto bg-gray-50 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent p-6 md:p-0 z-20'
                : 'hidden md:flex')
            }
          >
            <NavLink
              to='/elections'
              onClick={closeNavMenu}
              className={({ isActive }) =>
                `block py-2 md:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`
              }
            >
              Elections
            </NavLink>
            <NavLink
              to='/results'
              onClick={closeNavMenu}
              className={({ isActive }) =>
                `block py-2 md:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`
              }
            >
              Results
            </NavLink>
            <NavLink
              to='/logout'
              onClick={closeNavMenu}
              className={({ isActive }) =>
                `block py-2 md:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`
              }
            >
              Logout
            </NavLink>
          </div>
          </div>
          {/* Theme Toggle */}
          <button
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={changeThemeHandler}
            aria-label="Toggle Theme"
          >
            {darkTheme === 'dark' ? <IoMdSunny className="text-yellow-400" /> : <IoIosMoon className="text-gray-700" />}
          </button>
          {/* Mobile Nav Toggle */}
          <button
            className="ml-2 md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setShowNav(!showNav)}
            aria-label="Toggle Navigation"
          >
            {showNav ? <AiOutlineClose /> : <HiBars3 />}
          </button>
        </div>
    </nav>
  );
};

export default Navbar;