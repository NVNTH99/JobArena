import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Navbar = React.memo((props)=>{
    // console.log("Navbar",props.user_id)
    return(
        <header id="Navbar">
            <Logo/>
            <NavItems userType = {props.userType} user_id={props.user_id ? props.user_id : null}/>
            <Profile user_id={props.user_id} userType = {props.userType}/>
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
        // {navTitle: "Profile", link: "/candidate/profile"}, 
        {navTitle: "notification", link: ""}
        // {navTitle: "Logout", link: "/home"}
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


function NavLink(props){ //contains props.user_id
  
  function handleClick(){
    setToggleNotification(!toggleNotification);
  }
  const [notification,setnotifs] = useState([])
  const [toggleNotification, setToggleNotification] = useState(false);

  const fetchNotifs = () => {
    axios.get('http://localhost:3000/notifications',{
      params : {
        cand_id: props.user_id
      }
    })
    .then(response => {
      setnotifs(response.data)
    })
    .catch(error => {
      console.log(error,"Error retrieving notifications")
    })
  }

  useEffect(() =>{
    var box = document.getElementById('box');
    if(box)
      if(!toggleNotification)
        box.style.display = "none";
      else{
        fetchNotifs()
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
            {notification.slice().reverse().map((message, index)=>
              <div key={index} className="notification_element">{message.message}</div>
            )}
          </div>
        </div>
      </li>
    )
  // console.log("NavLink",props.user_id)
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

function Profile(props){
  const navigate = useNavigate();
  function handleClick(){
    setToggleNotification(!toggleNotification);
  }

  let profitems = [];
    if(props.userType === "candidate"){
      profitems = [
        {profTitle: "Profile", link: "/candidate/profile"}, 
        {profTitle: "Logout", link: "/home"}
      ];
      // notification = true;
    }
    else if(props.userType === "recruiter"){
      profitems = [{profTitle: "Logout", link: "/home"}];
    }
    // else{
    //   profitems = [{profTitle: "Login", link: "/login"}];
    // }

  const [toggleNotification, setToggleNotification] = useState(false);
  useEffect(() =>{
    var box = document.getElementById('profile_box');
    if(box)
    if(!toggleNotification)
      box.style.display = "none";
    else{
      box.style.display = "block";
    }
  },[toggleNotification]);

  const Redir = (link) => {
    navigate(link, { state: props.user_id  })
  }

  return(
      <div className="profile-icon">
          
          {/* <img src="/User_circle.png"></img> */}
          <button className="profile_button" onClick={handleClick}><div className="ellipse"><img src="/User_circle.png"></img></div></button>
        <div id="profile_box" className="profile_box">
          <div><h3>Hi User,</h3></div>
          <hr/>
          <div className="profile_container">
            {
              profitems.map((profitem,index) => (
                <div key = {index} className="profile_element" onClick={() => Redir(profitem.link)}>{profitem.profTitle}</div>
              ))
            }
            {/* <div className="profile_element">Profile</div>
            <div className="profile_element">Change Password</div>
            <div className="profile_element">Log out</div> */}
          </div>
        </div>
      </div>
    )
}

export default Navbar;

