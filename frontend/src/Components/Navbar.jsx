// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Ensure your CSS is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import mainlogo from '../assets/weblogo.png';

const Navbar = () => {

  const navigate=useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  const closeMenuOnScroll = () => {
    if (menuOpen) {
      setMenuOpen(false); // Close the menu when scrolling
    }
  };

  // Add a scroll event listener to close the menu when the user scrolls
  useEffect(() => {
    window.addEventListener('scroll', closeMenuOnScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', closeMenuOnScroll);
    };
  }, [menuOpen]);

  return (
    <header>
      <a href="#home" className="logo">
        <img
          style={{ height: '7vh', width: '7vh', marginTop: 'vh' }}
          src={mainlogo}
          alt="Logo"
        />
      </a>

      {/* Toggle icon between bars and times when the menu is open */}
      <div id="menu-bars" className="fas" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>

      {/* Toggle navbar active class based on menuOpen state */}
      <nav className={`navbar ${menuOpen ? 'nav-toggle' : ''}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#animals" onClick={() => setMenuOpen(false)}>Animals</a>
        <a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
        <a href="#games" onClick={() => setMenuOpen(false)}>Games</a>
        <a href="#movies" onClick={() => setMenuOpen(false)}>Movies</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a onClick={() =>{ setMenuOpen(false)
          navigate('shopping')
        }} class="shoppingbtn">shopping</a>
        
      </nav>
    </header>
  );
};

export default Navbar;
