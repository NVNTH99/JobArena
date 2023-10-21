import React from "react";
import { redirect } from "react-router-dom";
import axios from 'axios'
import { response } from "express";

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
    const redirect = () =>{
        axios.get('localhost:3000/login')
        .then(response => {
            console.log("Redirect")
        })
        .catch(error => {
            console.log("Some Error")
        })
    }

    return(
        <div className="NavItems">
            <nav>
                <li><button onClick={redirect}>Login</button></li>
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