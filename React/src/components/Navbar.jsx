import React from "react";
import { Link } from "react-router-dom";
// import { response } from "express";
import Login from "../Pages/Login";

function Navbar(){
    return(
        <header id="Navbar">
            <Logo/>
            <NavItems/>
            <Profile/>
        </header>
    );
}

function Logo(){
    return(
        <div className="logo">
            <p>
                Job<span>A</span>rena
            </p>
        </div>
    );
}

function NavItems(){
    // const redirect = () =>{
    //     history.push('/login')
    // }

    return(
        <div className="NavItems">
            <nav>
                <li><Link to="/login">Login</Link></li>
            </nav>
        </div>
    )
}

function Profile(){
    return(
    <div className="profile-icon">
        <div className="ellipse"></div>
        <img src="/User_circle.png"></img>
    </div>
    )
}

export default Navbar;