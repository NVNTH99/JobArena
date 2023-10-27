import React from "react";
import "./SignUp.css";

function SignUp(){
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
                                    <button className="b11" id="candbtn">Candidate</button>
                                    <button className="b11" id="recbtn">Recruiter</button>
                                </div>
                                <form className="signup" id="form1">
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input name="firstname" type="text" className="signup__input" placeholder="First Name"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input name="lastname" type="text" className="signup__input" placeholder="Last Name"></input>
                                        </div>
                                    </div>
                                    <div className="petti1">
                                        <div className="signup__field">
                                            <input name="username" type="text" className="signup__input" placeholder="Username"></input>
                                        </div>
                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input name="password" type="password" className="signup__input" placeholder="Password"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input name="repassword" type="password" className="signup__input"
                                                placeholder="Re-Confirm Password"></input>
                                        </div>
                                    </div>
                                    <div className="butttton">
                                        <button className="bn31">Sign Up</button>
                                    </div>
                                </form>
                                <form className="signup" id="form2">
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input name="firstname" type="text" className="signup__input" placeholder="First Name"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input name="lastname" type="text" className="signup__input" placeholder="Last Name"></input>
                                        </div>

                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input name="username" type="text" className="signup__input" placeholder="Username"></input>
                                        </div>
                                        <div className="signup__field">
                                            <select className="dropdownsign" id="dropdownOptions" name="organization"
                                                placeholder="Organization">
                                                <option value="Oracle">Oracle</option>
                                                <option value="Amazon">Amazon</option>
                                                <option value="Google">Google</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="petti2">
                                        <input type="text" name="organization" id="otherInput" className="signup__input"
                                            placeholder="Please specify" />
                                    </div>
                                    <div className="petti">
                                        <div className="signup__field">
                                            <input name="password" type="password" className="signup__input" placeholder="Password"></input>
                                        </div>
                                        <div className="signup__field">
                                            <input name="repassword" type="password" className="signup__input"
                                                placeholder="Re-Confirm Password"></input>
                                        </div>
                                    </div>
                                    <div className="butttton">
                                        <button className="bn31">Sign Up</button>
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
                <canvas className="background"></canvas>
            </section>
        </>
    )
}

export default SignUp;