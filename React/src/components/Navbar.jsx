import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons"

const Navbar = React.memo((props)=>{
    // console.log("Navbar",props.user_id)
    return(
        <header id="Navbar">
            <Logo/>
            <NavItems userType = {props.userType} user_id={props.user_id ? props.user_id : null}/>
            <Profile/>
        </header>
    );
})

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
  // console.log("NavItems",props.user_id)
    let notification = null;
    var navitems = [];
    if(props.userType === "candidate"){
      navitems = [
        {navTitle: "Home", link: "/candidate/home"}, 
        {navTitle: "Applied Jobs", link: "/candidate/applied_jobs"},
        {navTitle: "Profile", link: "/candidate/profile"}, 
        {navTitle: "notification", link: ""},
        {navTitle: "Logout", link: "/home"}
      ];
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
                user_id={props.user_id ? props.user_id : null}
              />)
            }
          </ul>
        </nav>
      </div>
    );
  }

function NavLink(props){
  if(props.navTitle === "notification")
    return(
      <li className="nav-link">
        <FontAwesomeIcon icon={faBell} size = "xl" style={{color: "#ffffff",}} />
      </li>
    )
  console.log("NavLink",props.user_id)
  return(
    <li className="nav-link">
      {/* <Link to = {{
        pathname: props.link, 
        state:{
          user_id : props.user_id ? props.user_id : null
        }}}> */}
      <Link to = {props.link}  state={props.user_id ? props.user_id : null}>
      {props.navTitle}
      </Link>
    </li>
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