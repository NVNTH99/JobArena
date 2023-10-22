import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faLock } from "@fortawesome/free-solid-svg-icons";
import './Login.css'

function Login(){
    return(
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <FontAwesomeIcon className="login__icon" icon={faUser}/>
                            <input 
                                className="login__input"
                                type="text" 
                                placeholder="Username">
                            </input>
                        </div>
                        <div className="login__field">
                            <FontAwesomeIcon className="login__icon" icon={faLock}/>
                            <i className="login__icon fa fa-lock"></i>
                            <input 
                                className="login__input"
                                type="password" 
                                placeholder="Password">
                            </input>
                        </div>
                        <div className="button">
                            <a href="/"><button className="bn30">Login</button></a>
                        </div>
                    </form>
                    <div className="guestbtn extra-link">
                        <a className="guest_text" href="/">Continue as guest</a>
                        <div className="guest_text">Don't have an account? <a className="up" href="/">Sign up</a> </div>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}

export default Login