import React from "react";
import { Link } from "react-router-dom";

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

function NavItems() {
    return (
      <div className="NavItems">
        <nav>
          <ul>
            <li className="nav-link">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
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