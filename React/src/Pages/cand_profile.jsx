import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import UpcomingCard from "../components/UpcomingCard";
import "./cand_profile.css"
// import 'bootstrap/dist/css/bootstrap.min.css'

var upcoming = [
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]
var events = {"upcoming":upcoming};

function Cand_profile() {
  return (
    <>
    <Navbar userType = "candidate"/>
    <Heading title = "Candidate Profile"/>
    <div>
        <div className="alllllcp">
            <section className="lhscp">
                <form id="addcp">
                <div className="cpbg">
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="firstname" className="lblcp">First Name</label>
                        <input type="text" className="cp__input" id="firstname" aria-describedby="firstname" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="lastname" className="lblcp">Last Name</label>
                        <input type="text" className="cp__input" id="lastname" />
                    </div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="linkedin" className="lblcp">LinkedIn Profile</label>
                        <input type="text" className="cp__input" id="linkedin" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="dob" className="lblcp">Date Of Birth</label>
                        <input type="date" className="cp__input" id="dob" />
                    </div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="Phno" className="lblcp">Phone Number</label>
                        <input type="number" className="cp__input" id="Phno" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="nationality" className="lblcp">Nationality</label>
                        <input type="text" className="cp__input" id="nationality" />
                    </div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="gender" className="lblcp">Gender</label>
                        <select id="gender" className="dropdowncp">
                        <option selected value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="trans">Transgender</option>
                        </select>
                    </div>
                    <div className="cp__field">
                        <label htmlFor="disability" className="lblcp">Disability</label>
                        <input type="text" className="cp__input" id="disability" aria-describedby="disability" />
                    </div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="address" className="lblcp">Address</label>
                        <textarea className="cp__input" id="address" rows="4"></textarea>
                    </div>
                    <div className="cp__field">
                        <label htmlFor="skills" className="lblcp">Skills</label>
                        <textarea className="cp__input" id="skills" rows="4"></textarea>
                    </div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="resume" className="lblcp">Upload Resume</label>
                        <input type="file" className="cp__input" id="resume" aria-describedby="resume" />
                    </div>
                    <div className="cp__field"></div>
                    </div>
                    <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="languages" className="lblcp">Languages</label>
                        <div className="catgrpcp">
                        <input type="text" id="langfieldcp" className="cp__input" aria-describedby="languages" />
                        <button type="button" id="langpluscp">ADD <i className="fa fa-plus"></i></button>
                        </div>
                        <div id="lang-listcp"></div>
                    </div>
                    <div className="cp__field">
                        <label htmlFor="domain" className="lblcp">Interested Domain</label>
                        <div className="catgrpcp">
                        <input type="text" id="domainfieldcp" className="cp__input" aria-describedby="domain" />
                        <button type="button" id="domainpluscp">ADD <i className="fa fa-plus"></i></button>
                        </div>
                        <div id="domain-listcp"></div>
                    </div>
                    </div>
                    <div className="xtra-formcp">
                    <h2 className="xtra-headingcp">Work Experience</h2>
                    <hr className="hrrcp" />
                    <div className="xtra-form-container">
                        <div className="petticp">
                        <div className="cp__field">
                            <label htmlFor="jobtitle" className="lblcp">Job Title</label>
                            <input type="text" className="cp__input" id="jobtitle" aria-describedby="jobtitle" />
                        </div>
                        <div className="cp__field">
                            <label htmlFor="orgname" className="lblcp">Organisation Name</label>
                            <input type="text" className="cp__input" id="orgname" />
                        </div>
                        </div>
                        <div className="petticp">
                        <div className="cp__field">
                            <label htmlFor="startyear" className="lblcp">Start Year</label>
                            <input type="number" className="cp__input" id="startyear" aria-describedby="startyear" />
                        </div>
                        <div className="cp__field">
                            <label htmlFor="endyear" className="lblcp">End Year</label>
                            <input type="text" className="cp__input" id="endyear" />
                        </div>
                        </div>
                        <div className="petticp-btn">
                        <button type="button" className="delwkcp" id="deleteButton1" value="Delete">Delete</button>
                        </div>
                        <hr className="smhrr" />
                    </div>
                    <div className="petticp-btn" id="xxx3">
                        <button type="button" className="addwkcp" id="addMoreButton" value="addmore">Add More</button>
                    </div>
                    </div>
                    <div className="xtra-formcp2">
                    <h2 className="xtra-headingcp">Projects</h2>
                    <hr className="hrrcp" />
                    <div className="xtra-form-container2">
                        <div className="petticp">
                        <div className="cp__field">
                            <label htmlFor="projecttitle" className="lblcp">Project Title</label>
                            <input type="text" className="cp__input i1" id="projecttitle" aria-describedby="projecttitle" />
                        </div>
                        <div className="cp__field"></div>
                        </div>
                        <div className="petticp">
                        <div className="cp__field">
                            <label htmlFor="startyear2" className="lblcp">Start Year</label>
                            <input type="number" className="cp__input i1" id="startyear2" aria-describedby="startyear" />
                        </div>
                        <div className="cp__field">
                            <label htmlFor="endyear2" className="lblcp">End Year</label>
                            <input type="text" className="cp__input i1" id="endyear2" />
                        </div>
                        </div>
                        <div className="petticp-btn">
                        <button type="button" className="delwkcp" id="deleteButton1" value="Delete">Delete</button>
                        </div>
                        <hr className="smhrr" />
                    </div>
                    <div className="petticp-btn" id="xxx32">
                        <button type="button" className="addwkcp" id="addMoreButton2" value="addmore">Add More</button>
                    </div>
                    </div>
                    <div id="formsavebtncp">
                    <a className="savebtncp" href="#">
                        <p>Save</p>
                    </a>
                    </div>
                </div>
                </form>
                <div className="screen__backgroundcp">
                <span className="screen__background__shapecp screen__background__shape4cp"></span>
                <span className="screen__background__shapecp screen__background__shape3cp"></span>
                <span className="screen__background__shapecp screen__background__shape2cp"></span>
                <span className="screen__background__shapecp screen__background__shape1cp"></span>
                </div>
            </section>
        </div>
    </div>
    </>
  );
}

export default Cand_profile