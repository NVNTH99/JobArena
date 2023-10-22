import React,{ useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faLock } from "@fortawesome/free-solid-svg-icons";
import './Login.css'
// import { response } from "express";
import axios from 'axios'
// import { useHistory } from 'react-router-dom';

function Login(){
    const [credentials, setcred] = useState({
        username:'',
        password: ''
    })
    // const history = useHistory();
    const [retrieved , setretrieval] = useState('')
    const [error, seterror] = useState('')

    const loginfunc = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login',credentials)
        .then(response => {
            if(typeof response.data === 'string'){
                setretrieval(response.data)
                if(retrieved === 'candidate'){
                    // history.push()
                }
                else{

                }
            }
            else{
                setcred({
                    username:'',
                    password:''
                })
                seterror('Invalid login credentials')
            }
        })
        .catch(error => {
            console.log("Error while logging in")
        })
    }

    return(
        <>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login">
                            <div className="login__field">
                                <FontAwesomeIcon className="login__icon" icon={faUser}/>
                                <input 
                                name="username"
                                nametype="text" 
                                className="login__input" 
                                placeholder="Username"
                                value={credentials.username}
                                onChange={(e)=>{
                                    const {name,value} = e.target
                                    setcred((prevCredentials)=>({
                                        ...prevCredentials,
                                        [name]:value
                                    }))
                                }}
                                >
                                </input>
                            </div>
                            <div className="login__field">
                                <FontAwesomeIcon className="login__icon" icon={faLock}/>
                                <i className="login__icon fa fa-lock"></i>
                                <input 
                                name="password" 
                                type="password" 
                                className="login__input" 
                                placeholder="Password" 
                                value={credentials.password} 
                                onChange={(e)=>{
                                    const {name,value} = e.target
                                    setcred((prevCredentials)=>({
                                        ...prevCredentials,
                                        [name]:value
                                    }))
                                }}>

                                </input>
                            </div>
                            <div className="button">
                                <button className="bn30" onClick={loginfunc}>Login</button>
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
        </>
    )
}

export default Login