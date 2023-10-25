import React from "react";
import Navbar from "../components/Navbar";
import "./RecruiterHome.css";

function RecruiterHome(){
    return (
        <>
            <Navbar userType="recruiter"/>
            <div className="alllll">
                <div className="head">
                    <h1 id="yourjobs">Your Jobs</h1>
                    <a className="addbtn" href="#">
                        <p>Add Job</p><i className="fa fa-plus"></i>
                    </a>
                </div>
                <hr id="hrr"></hr>
                <section className="jobcardssection">
                    <div className="jobcards">
                        <div className="jobtext">
                            <div className="jobdet">Job Title</div>
                            <div className="jobdet">Company Name, Location</div>
                            <div className="jobdet">Category</div>
                            <div className="jobdesc">Short description of the job - Lorem ipsum is placeholder text commonly used in
                                the
                                graphic, print, and publishing industries for </div>

                        </div>
                        <div className="rbtns">
                            <a className="editbtn" href="#">
                                <p>Edit</p><i className="fa fa-solid fa-pen-to-square"></i>
                            </a>
                            <a className="delbtn" href="#">
                                <p>Delete</p><i className="fa fa-trash-can"></i>
                            </a>
                            <p className="applrec">5 Applications Received</p>
                        </div>
                    </div>
                </section>            
            </div>
        </>
    )
}

export default RecruiterHome