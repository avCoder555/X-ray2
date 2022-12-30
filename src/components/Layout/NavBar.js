import React, { useState } from "react";
import a from '../../assets/images/avatars/avatar-1.png'
import avaterImg2 from '../../assets/images/avatars/avatar-2.png';
import errorImg from '../../assets/images/errors-images/404-error.png';
import { Dropdown, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";

const Header = ({menuIconOnClick}) => {
    const [profileToggle, setProfileToggle] = useState(false);
    const [modal, setModal] = React.useState(false);

    const onCLickProfile = () => {
        setProfileToggle((prevState) => prevState ? false : true)
    }
    const toggle = () => {
        setModal((prevState) => prevState ? false : true)
    }
    const logOut=()=>{
        localStorage.removeItem("auth");
        localStorage.removeItem("user")
    }
    return (
        <React.Fragment>
            <>
                {/*header*/}
                <header className="top-header">
                    <nav className="navbar navbar-expand">
                        <div className="left-topbar d-flex align-items-center">
                            <a href="#" className="toggle-btn">
                                {" "}
                                <i className="bx bx-menu" onClick={menuIconOnClick}/>
                            </a>
                        </div>
                        <div className="flex-grow-1 search-bar">
                            <div className="input-group">
                                <button
                                    className="btn btn-search-back search-arrow-back"
                                    type="button"
                                >
                                    <i className="bx bx-arrow-back" />
                                </button>
                                <input type="text" className="form-control" placeholder="search" />
                                <button className="btn btn-search" type="button">
                                    <i className="lni lni-search-alt" />
                                </button>
                            </div>
                        </div>
                        <div className="right-topbar ms-auto">
                            <ul className="navbar-nav">
                                <li className={`nav-item dropdown dropdown-user-profile ${profileToggle ? 'show' : ''}`}>
                                    <a
                                        className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        onClick={toggle}
                                    >
                                        <div className="d-flex user-box align-items-center">
                                            <div className="user-info">
                                                <p className="user-name mb-0">Admin</p>
                                                <p className="designattion mb-0">Available</p>
                                            </div>
                                            <img
                                                src={a}
                                                className="user-img"
                                                alt="user avatar"
                                            />
                                        </div>
                                    </a>
                                    <Dropdown isOpen={modal} toggle={toggle}>
                                        <DropdownMenu>
                                            <a className="dropdown-item" href="#">
                                                <i className="bx bx-user" />
                                                <span>Profile</span>
                                            </a>
                                           
                                            <div className="dropdown-divider mb-0" />{" "}
                                             <Link to="/logout" className="dropdown-item">
                                             <i className="bx bx-power-off" />
                                             <span>Logout</span>
                                            </Link>
                                        </DropdownMenu>
                                    </Dropdown>

                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                {/*end header*/}
            </>

        </React.Fragment>
    )
}

export default Header;