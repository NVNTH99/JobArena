import React,{ useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import './Login.css'
// import { response } from "express";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginBackground(){
    // window.onload = function () {
    //     Particles.init({
    //         selector: ".background",
    //     });
    // };
    const particles = Particles.init({
    selector: ".background",
    color: ["#03dac6", "#6058A3", "#ff0266"],
    connectParticles: true,
    responsive: [
        {
        breakpoint: 768,
        options: {
            color: ["#faebd7", "#03dac6", "#ff0266"],
            maxParticles: 2,
            connectParticles: false,
        },
        },
    ],
    });
}

function Login(){
    const [credentials, setcred] = useState({
        username:'',
        password: ''
    })
    const navigate = useNavigate();
    const [retrieved , setretrieval] = useState({})
    const [error, seterror] = useState('')

    // useEffect(()=>{
    //     LoginBackground();
    // }, []);

    const loginfunc = (e) => {
        e.preventDefault();
        // console.log(`${process.env.ROOT}/login`)
        axios.post('http://localhost:3000/login',credentials)
        .then(response => {
            if(typeof response.data === 'object'){
                // console.log(0)
                setretrieval(response.data)
                // console.log(retrieved)
            }
            else{
                setcred({
                    username:'',
                    password:''
                });
                seterror('Invalid login credentials');
            }
        })
        .catch(error => {
            console.log("Error while logging in");
            seterror('An error occurred while logging in');
        })
    }

    useEffect(()=>{
        if(retrieved.type === 'candidate'){
            // console.log(2)
            navigate('/candidate/home', { state: retrieved.user_id  })
        }
        else if(retrieved.type === 'recruiter'){
            navigate("/recruiter/home", { state: retrieved.user_id  })
        }
    },[retrieved])

    return(
        <>
        <section className="bg">
        <div className="mainflex">
            <div className="nav">
                <h1 className="jh1">JOB <span className="redA">A</span>RENA</h1>
                <h3 className="spaner loader jh3">
                    <span className="m">U</span>
                    <span className="m">N</span>
                    <span className="m">L</span>
                    <span className="m">O</span>
                    <span className="m">C</span>
                    <span className="m">K</span>
                    <span className="m">&nbsp;</span>
                    <span className="m">y</span>
                    <span className="m">o</span>
                    <span className="m">u</span>
                    <span className="m">r</span>
                    <span className="m">&nbsp;</span>
                    <span className="m">C</span>
                    <span className="m">A</span>
                    <span className="m">R</span>
                    <span className="m">E</span>
                    <span className="m">E</span>
                    <span className="m">R</span>
                </h3>
            </div>

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
                            {error && <p className="lerror"><FontAwesomeIcon icon={faTriangleExclamation}/> &nbsp;{error}</p>}
                            <div className="button">
                                <button className="bn30" onClick={loginfunc}>Login</button>
                            </div>
                        </form>
                        <div className="guestbtn extra-link">
                            <Link className="guest_text" to="/home">Continue as guest</Link>
                            <div className="guest_text">Don't have an account? <Link className="up" to="/signup">Sign Up</Link></div>
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
        </div>
        <canvas className="background"></canvas>
        </section>
        </>
    )
}

export default Login