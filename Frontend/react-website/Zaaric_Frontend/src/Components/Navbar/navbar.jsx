import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/zaaric_logo.png';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0); // turn black as soon as scroll starts
    onScroll(); // set initial state in case user reloads mid-page
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showNavBar = () => setIsClicked(true);
  const hideNavBar = () => setIsClicked(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navBar">
        <div
          className="logo"
          onClick={() => scrollToSection('hero')}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} width="150" alt="Zaaric Logo" />
        </div>

        <ul className="navMenu hidePCnavOnMobile">
          <li onClick={() => scrollToSection('hero')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
          <li onClick={() => scrollToSection('team')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Team</Link>
          </li>
          <li onClick={() => scrollToSection('services')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Services</Link>
          </li>
          <li onClick={() => scrollToSection('industries')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Industries</Link>
          </li>
          <li onClick={() => scrollToSection('careers')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Careers</Link>
          </li>
          <li className="About" onClick={() => scrollToSection('about')}>
            <Link to="/" style={{ textDecoration: 'none' }}>About</Link>
          </li>
          <li className="Contact" onClick={() => scrollToSection('contact')}>
            <Link to="/" style={{ textDecoration: 'none' }}>Contact</Link>
          </li>
        </ul>

        {/* Quick Access Button */}
        <div
          className="pf pf_1"
          style={{
            display: !isClicked ? 'none' : 'block',
            transform: isClicked ? 'scale(0.001)' : 'scale(1)'
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <section onClick={() => scrollToSection('team')}>Team</section>
          </Link>
        </div>

        {/* Mobile navbar icon */}
        <div className="navBarOpen showOnMobile">
          <a onClick={showNavBar} href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </div>

        {/* Mobile sidebar */}
        <ul className={`sidebar navMenu ${isClicked ? 'show-sidebar' : ''}`}>
          <li className="navBarClose" onClick={hideNavBar}>
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#e8eaed">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('hero'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('team'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Team</Link>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('services'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Services</Link>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('industries'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Industries</Link>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('insights'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Insights</Link>
          </li>
          <li onClick={() => { hideNavBar(); scrollToSection('careers'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Careers</Link>
          </li>
          <li className="About" onClick={() => { hideNavBar(); scrollToSection('about'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>About</Link>
          </li>
          <li className="Contact" onClick={() => { hideNavBar(); scrollToSection('contact'); }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
