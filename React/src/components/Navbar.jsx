import React from "react";

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
    return(
        <div className="NavItems">
            <nav>
                
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