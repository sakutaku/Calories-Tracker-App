import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../assets/logo.svg";

const Toolbar = () => {
    return (
        <nav className="main-nav">
            <NavLink to="/" className="logo">
                <div>
                    <img alt={logo} src={logo}/>
                    <span className="logo-txt">Foo</span>
                </div>
            </NavLink>
        </nav>
    );
};

export default Toolbar;