import React from 'react';
import Logo from '../assets/img/logo.png';

const Header = () => {
    return (
        <header className="main-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-6 col-sm-4">
                        <div className="logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                    </div>
                    <div className="col-6 col-sm-8">
                        <ul className="nav-links">
                            <a href>Home</a>
                            <a href="#">Services</a>
                            <a href="about.html">About</a>
                            <a href="#">Contact Us</a>
                            <a href="#">Register</a>
                            <a href="http://103.15.67.180:3000/" className="btn custom-btn">Book Now</a>
                        </ul>
                        <div className="burger">
                            <div className="line1" />
                            <div className="line2" />
                            <div className="line3" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;