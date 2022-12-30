import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "../Layout/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [toggle, setToggle] = useState(false);
    
    const [offset, setOffset] = useState(0);
    const handleMouseOver = () => {
        setIsHovering((prevState) => prevState ? false : true)
    };

    const handleMouseOut = () => {
        setIsHovering((prevState) => prevState ? false : true)
    };
    const menuIconOnClick = () => {
        setToggle((prevState) => prevState ? false : true)
    }
    useEffect(() => {
        const onScroll = () => {
            setOffset(window.pageYOffset)
            // console.log('offset', window.pageYOffset)
        };
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className={`wrapper ${toggle ? 'toggled' : ''} ${isHovering ? 'sidebar-hovered' : ''}`} >
            <SideBar handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} menuIconOnClick={menuIconOnClick} />
            <NavBar menuIconOnClick={menuIconOnClick}/>
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
