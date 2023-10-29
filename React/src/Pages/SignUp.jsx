import React, {useState,useEffect} from "react";
import "./SignUp.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { response } from "express";

function loadfunc(){
  const candbtn = document.getElementById("candbtn");
  const recbtn = document.getElementById("recbtn");
  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  const dropdown = document.getElementById("dropdownOptions");
  const otherInput = document.getElementById("otherInput");

  if (candbtn) {
    candbtn.click();
    candbtn.addEventListener("click", function () {
      form1.style.display = "block";
      form2.style.display = "none";
    });
  }

  if (recbtn) {
    recbtn.addEventListener("click", function () {
      form1.style.display = "none";
      form2.style.display = "block";
    });
  }

  if (dropdown && otherInput) {
    dropdown.addEventListener("change", function () {
      if (dropdown.value === "others") {
        otherInput.style.display = "block";
      } else {
        otherInput.style.display = "none";
      }
    });
  }
//   window.onload = function () {
//     Particles.init({
//       selector: ".backgroundsign",
//     });
  
    
//   };
  const particles = Particles.init({
    selector: ".backgroundsign",
    color: ["#03dac6", "#6058A3", "#ff0266"],
    connectParticles: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          color: ["#faebd7", "#03dac6", "#ff0266"],
          maxParticles: 80,
          connectParticles: false,
        },
      },
    ],
  });
};

function SignUp(){
    const navigate = useNavigate();
    const [type,settype] = useState('candidate')
    const [credentials, setcred] = useState({
        firstname:'',
        lastname: '',
        username: '',
        password: '',
        repassword: '',
        organization: ''
    })
    const [usernameerror, setusernameerror] = useState()
    const [passworderror, setpassworderror] = useState()
    const [organizationerror, setorganizationerror] = useState()
    const [organizations,setorganizations] = useState([])
    const [user_id,setuser] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setcred((prevCredentials)=>({
          ...prevCredentials,
          [name]: value
        }));
    };

    const loadfunc = () => {
        const candbtn = document.getElementById("candbtn");
        const recbtn = document.getElementById("recbtn");
        const form1 = document.getElementById("form1");
        const form2 = document.getElementById("form2");
        const dropdown = document.getElementById("dropdownOptions");
        const otherInput = document.getElementById("otherInput");

        if (candbtn) {
            candbtn.click();
            candbtn.addEventListener("click", function () {
            form1.style.display = "block";
            form2.style.display = "none";
            });
        }

        if (recbtn) {
            recbtn.addEventListener("click", function () {
            form1.style.display = "none";
            form2.style.display = "block";
            });
        }

        if (dropdown && otherInput) {
            dropdown.addEventListener("change", function () {
            if (dropdown.value === "others") {
                otherInput.style.display = "block";
            } else {
                otherInput.style.display = "none";
            }
            });
        }
    }

    useEffect(()=>{
        loadfunc()
        axios.get('http://localhost:3000/organizations')
        .then(response => {
            setorganizations(response.data)
        })
        .catch(error => {
            console.log("Error fetching orgaizations")
        })
    },[])
    

    const handleCandidateClick = () => {
        settype('candidate');
    };

    const handleRecruiterClick = () => {
        settype('recruiter');
    };

    const signupfunc = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/login',{username: credentials.username})
        .then(response => {
            if(typeof response.data === 'object'){
                setusernameerror('Username taken');
            }
            else{
                setusernameerror('');
            }
        })
        .catch(error => {
            console.log("Error Checking for existence of username")
        })
        // if (!credentials.organization && type === 'recruiter') {
        //     setorganizationerror('Please enter an organization');
        // }
        // else{
        //     setorganizationerror('');
        // }
        // if (credentials.password !== credentials.repassword) {
        //     setpassworderror('Passwords do not match');
        // }
        // else{
        //     setpassworderror('');
        // }
        // if(usernameerror && passworderror && organizationerror && usernameerror==='' && passworderror === '' && organizationerror === ''){
        //     e.preventDefault()
        //     axios.post('http://localhost:3000/signup', { credential: credentials, type: type })
        //     .then(response => {
        //         // console.log(response.data)
        //         setuser(response.data)
        //     })
        //     .catch(error => {
        //         console.log("Error Signing up")
        //     })
        // }
    }

    useEffect(()=>{
        console.log(usernameerror,passworderror,organizationerror,"1")
        if(typeof usernameerror === 'string'){
            if (!credentials.organization && type === 'recruiter') {
                setorganizationerror('Please enter an organization');
            }
            else{
                setorganizationerror('');
            }
        }
    },[usernameerror])

    useEffect(()=>{
        console.log(usernameerror,passworderror,organizationerror,"2")
        if(typeof organizationerror === 'string'){
            if (credentials.password !== credentials.repassword) {
                setpassworderror('Passwords do not match');
            }
            else{
                setpassworderror('');
            }
        }
    },[organizationerror])

    useEffect(()=> {
        console.log(usernameerror,passworderror,organizationerror,"3")
        if(typeof passworderror === 'string'){
            if(usernameerror==='' && passworderror === '' && organizationerror === ''){
                axios.post('http://localhost:3000/signup', { credential: credentials, type: type })
                .then(response => {
                    // console.log(response.data)
                    setuser(response.data)
                })
                .catch(error => {
                    console.log("Error Signing up")
                })
            }
            else{
                setusernameerror()
                setorganizationerror()
                setpassworderror()
            }
        }
    },[passworderror])

    useEffect(() => {
        // console.log(user_id)
        if(user_id){
            if(type === 'candidate'){
                console.log("Went to candidate")
                navigate('/candidate/home', { state: { user_id: user_id.user_id } })
            }
            else if(type === 'recruiter'){
                console.log("Went to Recruiter")
                navigate("/recruiter/home", { state: { user_id: user_id.user_id } })
            }
        }
    },[user_id])

    // useEffect(() =>{
    //     loadfunc();
    // },[]);
    return(
        <>
            <section className="bgsign">
                <div className="mainflexsign">
                    <div className="navsign">
                        <h1 className="jh1sign">JOB <span className="redAsign">A</span>RENA</h1>
                        <h3 className="spanersign loadersign">
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

                    <div className="containersign">
                        <div className="screensign">
                            <div className="screen__contentsign">
                                <div className="btn-group">
                                    <button className="b11" id="candbtn" onClick={handleCandidateClick}>Candidate</button>
                                    <button className="b11" id="recbtn" onClick={handleRecruiterClick}>Recruiter</button>
                                </div>
                                <form className="signup" id="form1">
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input 
                                            name="firstname" 
                                            type="text" 
                                            className="signup__input"
                                            value = {credentials.firstname}
                                            onChange={handleChange}
                                            placeholder="First Name"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input 
                                            name="lastname" 
                                            type="text" 
                                            className="signup__input"
                                            value = {credentials.lastname}
                                            onChange={handleChange}
                                            placeholder="Last Name"></input>
                                        </div>
                                    </div>
                                    <div className="petti1">
                                        <div className="signup__field">
                                            <input 
                                            name="username" 
                                            type="text" 
                                            className="signup__input" 
                                            value = {credentials.username}
                                            onChange={handleChange}
                                            placeholder="Username"></input>
                                        </div>
                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input 
                                            name="password" 
                                            type="password" 
                                            className="signup__input"
                                            value = {credentials.password}
                                            onChange={handleChange}
                                            placeholder="Password"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input 
                                            name="repassword" 
                                            type="password" 
                                            className="signup__input"
                                            value = {credentials.repassword}
                                            onChange={handleChange}
                                            placeholder="Re-Confirm Password"></input>
                                        </div>
                                    </div>
                                    <div className="butttton">
                                        <button className="bn31"  onClick={signupfunc}>Sign Up</button>
                                    </div>
                                </form>
                                <form className="signup" id="form2">
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input 
                                            name="firstname" 
                                            type="text" 
                                            className="signup__input"
                                            value = {credentials.firstname}
                                            onChange={handleChange}
                                            placeholder="First Name"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input 
                                            name="lastname" 
                                            type="text" 
                                            className="signup__input"
                                            value = {credentials.lastname}
                                            onChange={handleChange}
                                            placeholder="Last Name"></input>
                                        </div>

                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input 
                                            name="username" 
                                            type="text" 
                                            className="signup__input"
                                            value = {credentials.username}
                                            onChange={handleChange}
                                            placeholder="Username"></input>
                                        </div>
                                        <div className="signup__field">
                                            <select className="dropdownsign" id="dropdownOptions" name="organization"
                                                placeholder="Organization" onChange={handleChange}> {/*Make this retrieve from a list named organizations*/}
                                                <option value="Oracle">Oracle</option>
                                                <option value="Amazon">Amazon</option>
                                                <option value="Google">Google</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="petti2">
                                        <input 
                                        type="text" 
                                        name="organization" 
                                        id="otherInput" 
                                        className="signup__input"
                                        value = {credentials.organization}
                                        onChange={handleChange}
                                        placeholder="Please specify" />
                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input 
                                            name="password" 
                                            type="password" 
                                            className="signup__input"
                                            value = {credentials.password}
                                            onChange={handleChange}
                                            placeholder="Password"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input 
                                            name="repassword" 
                                            type="password" 
                                            className="signup__input"
                                            value = {credentials.repassword}
                                            onChange={handleChange}
                                            placeholder="Re-Confirm Password"></input>
                                        </div>
                                    </div>
                                    <div className="butttton">
                                        <button className="bn31" onClick={signupfunc}>Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="screen__backgroundsign">
                                <span className="screen__background__shapesign screen__background__shape4sign"></span>
                                <span className="screen__background__shapesign screen__background__shape3sign"></span>
                                <span className="screen__background__shapesign screen__background__shape2sign"></span>
                                <span className="screen__background__shapesign screen__background__shape1sign"></span>
                            </div>
                        </div>
                    </div>


                </div>
                <canvas className="backgroundsign"></canvas>
            </section>
        </>
    )
}

export default SignUp;