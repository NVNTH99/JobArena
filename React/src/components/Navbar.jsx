import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons"

function Navbar(props){
    return(
        <header id="Navbar">
            <Logo/>
            <NavItems userType = {props.userType}/>
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

function NavItems(props) {
    let notification = null;
    var navitems = [];
    if(props.userType === "candidate"){
      navitems = [{navTitle: "Home", link: "/candidate/home"}, {navTitle: "Applied Jobs", link: "/candidate/applied_jobs"}, {navTitle: "notification", link: ""}];
      notification = true;
    }
    else if(props.userType === "recruiter"){
      navitems = [{navTitle: "Home", link: "/recruiter/home"}];
    }
    else{
      navitems = [{navTitle: "Login", link: "/login"}];
    }
    return (
      <div className="NavItems">
        <nav>
          <ul>
            {
              navitems.map((navitem, index) => 
              <NavLink 
                key = {index}
                navTitle = {navitem.navTitle} 
                link = {navitem.link}
              />)
            }
          </ul>
        </nav>
      </div>
    );
  }


function NavLink(props){
  
  function handleClick(){
    setToggleNotification(!toggleNotification);
  }

  const [toggleNotification, setToggleNotification] = useState(false);
  useEffect(() =>{
    var box = document.getElementById('box');
    if(!toggleNotification)
      box.style.display = "none";
    else{
      box.style.display = "block";
    }
  },[toggleNotification]);

  if(props.navTitle === "notification")
    return(
      <li className="nav-link">
        <button className="notification_button" onClick={handleClick}><FontAwesomeIcon icon={faBell} size = "xl" style={{color: "#ffffff",}} /></button>
        <div id="box" className="notification_box">
          <div><h3>Notifications <span>{notification.length}</span></h3></div>
          <hr/>
          <div className="notification_container">
            {notification.map((message, index)=>
              <div key={index} className="notification_element">{message}</div>
            )}
          </div>
        </div>
      </li>
    )
  return(
    <li className="nav-link">
      <Link to = {props.link}>{props.navTitle}</Link>
    </li>
  )
}

function Profile(){
    return(
        <div className="profile-icon">
            <div className="ellipse"><img src="/User_circle.png"></img></div>
            {/* <img src="/User_circle.png"></img> */}
        </div>
    )
}

export default Navbar;

let notification = ["You got placed bitch.", "Your application got rejected.","You are invited for an interview",]