import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/zaaric_logo.png'

const Navbar = () => {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [showMobile, setShowMobile] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    

    const showNavBar = () => {
        setIsClicked(true);
    }

    const hideNavBar = () => {
        setIsClicked(false);
    }

    const showMobileIcon = () => {
        setShowMobile(true);
    }

    return (
        <header>
            <div className='navBar'>
                <div
                    className="logo"
                    onClick={() => scrollToSection('hero')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={logo} width='150px' alt="Zaaric Logo" />
                </div>

                <ul className="navMenu hidePCnavOnMobile">
                    <li onClick={() => scrollToSection('hero')}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Home </Link>
                    </li>

                    <li onClick={() => scrollToSection('services')}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Services </Link>
                    </li>

                    <li className='About' onClick={() => scrollToSection('about')}>
                        <Link to='/' style={{ textDecoration: 'none' }}> About</Link>
                    </li>

                    <li className='Contact' onClick={() => scrollToSection('contact')}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Contact</Link>
                    </li>
                </ul>

                {/*Packages Button*/}
                <div className="pf pf_1" style={{ display: !isClicked ? "none" : "block", transform: isClicked ? "scale(0.001)" : "scale(1)" }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <section onClick={() => scrollToSection('packages')}> Packages </section>
                    </Link>
                </div>

                {/*Mobile navbar icon*/}
                <div className='navBarOpen showOnMobile'>
                    <a onClick={showNavBar} href='#'><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></a>
                </div>

                {/*mobile navbar as sidebar*/}
                <ul className={`sidebar navMenu ${isClicked ? "show-sidebar" : ""} `}>
                    <li className='navBarClose' onClick={hideNavBar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </li>
                    <li onClick={() => { hideNavBar(); scrollToSection('hero') }}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Home </Link>
                    </li>

                    <li onClick={() => { hideNavBar(); scrollToSection('services') }}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Services </Link>
                    </li>

                    <li className='About' onClick={() => { hideNavBar(); scrollToSection('about') }}>
                        <Link to='/' style={{ textDecoration: 'none' }}> About</Link>
                    </li>

                    <li className='Contact' onClick={() => { hideNavBar(); scrollToSection('contact') }}>
                        <Link to='/' style={{ textDecoration: 'none' }}> Contact</Link>
                    </li>

                    <li>
                        <div className='pf'>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <section onClick={() => { hideNavBar(); scrollToSection('packages') }}> Packages </section>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
