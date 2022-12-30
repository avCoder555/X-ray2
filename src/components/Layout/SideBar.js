import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconLogo from '../../assets/images/TestigoFavicon.png';
import testiGoLogo from '../../assets/images/TestigoLogo.png'
const SideBar = ({ menuIconOnClick, handleMouseOver, handleMouseOut }) => {
    const [isActive, setIsActive] = useState('');
    const [cmsMenuActive, setCmsMenuActive] = useState(false)
    const onClick = (value) => {
        setIsActive(value)
    };
    const onCLickCms = () => {
        setCmsMenuActive((prevState) => prevState ? false : true)
    }
    useEffect(() => {
        setIsActive(window.location.pathname)
    })

    
    return (
        <>
            <div className="sidebar-wrapper admin-sidebar" data-simplebar="true"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <div className="sidebar-header">
                    <div className="">
                        <img src={iconLogo} className="logo-icon-2" alt="" />
                    </div>
                    <div>
                        <h4 className="logo-text"><img src={testiGoLogo} className="side_logo" alt="" /></h4>
                    </div>
                    <a href="#" className="toggle-btn ms-auto">
                        {" "}
                        <i className="bx bx-menu" onClick={menuIconOnClick} />
                    </a>
                </div>

                <ul className="metismenu" id="menu">
                    <li className={isActive === '/users' ? 'mm-active' : ''}>
                        <Link to='/users' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">User</div>
                        </Link>
                    </li>
                    <li className={isActive === '/doctor' ? 'mm-active' : ''}>
                        <Link to='/doctor' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">Doctor</div>
                        </Link>
                    </li>
                    <li className={isActive === '/center' ? 'mm-active' : ''}>
                        <Link to='/center' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">Center</div>
                        </Link>
                    </li>
                    <li className={isActive === '/operator' ? 'mm-active' : ''}>
                        <Link to='/operator' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">Operator</div>
                        </Link>
                    </li>
                    <li className={isActive === '/xray' ? 'mm-active' : ''}>
                        <Link to='/xray' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">X-ray Types</div>
                        </Link>
                    </li>
                    <li className={isActive === '/xray-machine' ? 'mm-active' : ''}>
                        <Link to='/xray-machine' onClick={onClick}>
                            <div className="parent-icon">
                                <i className="bx bx-user" />
                            </div>
                            <div className="menu-title">X-ray Machine</div>
                        </Link>
                    </li>
                    <li className="menu-label">CMS</li>
                    <li>
                        <a className="has-arrow" href="#" onClick={onCLickCms}>

                            <div className="parent-icon icon-color-11"><i className="bx bx-menu"></i>
                            </div>
                            <div className="menu-title">CMS</div>
                        </a>
                        <ul className={`mm-collapse ${cmsMenuActive===true?'mm-show':''} `}>
                            <li className={isActive === '/manage-pages' ? 'mm-active' : ''}>
                                {" "}
                                <Link to='/manage-pages' onClick={onClick}>
                                    <i className="bx bx-right-arrow-alt" />
                                    Manage Pages
                                </Link>
                            </li>
                            <li className={isActive === '/slider' ? 'mm-active' : ''}>
                                {" "}
                                <Link to='/slider' onClick={onClick}>
                                    <i className="bx bx-right-arrow-alt" />
                                    Slider
                                </Link>
                            </li>
                            <li className={isActive === '/social-media-links' ? 'mm-active' : ''}>
                                {" "}
                                <Link to='/social-media-links' onClick={onClick}>
                                    <i className="bx bx-right-arrow-alt" />
                                    Social Media links
                                </Link>
                            </li>

                            <li className={isActive === '/gallery' ? 'mm-active' : ''}>
                                {" "}
                                <Link to='/gallery' onClick={onClick}>
                                    <i className="bx bx-right-arrow-alt" />
                                    Gallery
                                </Link>
                            </li>
                            <li className={isActive === '/contact-us' ? 'mm-active' : ''}>
                                {" "}
                                <Link to='/contact-us' onClick={onClick}>
                                    <i className="bx bx-right-arrow-alt" />
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                {/*end navigation*/}
            </div>
            {/*end sidebar-wrapper*/}
            {/* </div> */}

        </>
    )
}

export default SideBar;
