import React from "react";
import Navbar from "../components/Navbar";
import "./cand_profile.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
function Cand_profile(){
    return(
        <>
        <Navbar userType="candidate"/>
        <div className="alllll">
            <h1 id="yourjobs">Profile</h1>
            <hr id="hrr"></hr>
            
            <section className="lhs">
                <form>
                    <div className="row g-3">
                        <div className="col-6">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" aria-describedby="first-name"></input>
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname"></input>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="linkedin" className="form-label">LinkedIn Profile</label>
                            <input type="text" className="form-control" id="linkedin"></input>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dob" className="form-label">Date Of Birth</label>
                            <input type="text" className="form-control" id="dob"></input>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select id="gender" className="form-select" defaultValue={'male'}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="trans">Transgender</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="Phno" className="form-label">Phone Number</label>
                            <input type="number" className="form-control" id="Phno"></input>
                        </div>
                        <div className="col-6">
                            <label htmlFor="nationality" className="form-label">Nationality</label>
                            <input type="text" className="form-control" id="nationality"></input>
                        </div>
                        <div className="col-6">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea className="form-control" id="address" rows="4"></textarea>
                        </div>
                        <div className="col-6">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <textarea className="form-control" id="skills" rows="4"></textarea>
                        </div>
                        <div className="col-6">
                            <label htmlFor="resume" className="form-label">Upload Resume</label>
                            <input type="file" className="form-control" id="resume" aria-describedby="resume"></input>
                        </div>
                        <div className="col-6">
                            <label htmlFor="languages" className="form-label">Languages</label>
                            <input type="text" className="form-control" id="languages" aria-describedby="languages"></input>
                        </div>
                        <div className="col-6">
                            <label htmlFor="disability" className="form-label">Disability</label>
                            <input type="text" className="form-control" id="disability" aria-describedby="disability"></input>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-3" id="formsavebtn">
                            <a className="savebtn" href="#">
                                <p>Save</p>
                            </a>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        </>
    )
}

export default Cand_profile