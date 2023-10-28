import React from "react";
import Navbar from "../components/Navbar";
import UpcomingCard from "../components/UpcomingCard";
import RecruitersJobCard from "../components/RecruitersJobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./RecruiterHome.css";

var jobs = [
    {
      title:"Job Title", 
      company: "Company Name", 
      location:"Location", 
      category: "Category", 
      description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
    },
    {
      title:"Job 2", 
      company: "Company Name", 
      location:"Location", 
      category: "Category", 
      description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
    },
    {
      title:"Job 3", 
      company: "Company Name", 
      location:"Location", 
      category: "Category", 
      description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
    }
  ]

  var upcoming = [
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]
var events = {"upcoming":upcoming};

function RecruiterHome(){
    return (
        <>
            <Navbar userType="recruiter"/>
            <div className="recruiter-home-body">
                <div>
                    <div>
                        <h1>Your Jobs</h1>
                    </div>
                    <div>
                        <Link className="add-job-button" to="/recruiter/add_job">
                            <p>Add Job</p>
                            <FontAwesomeIcon size="md" icon={faPlus}/>
                        </Link>
                    </div>    
                </div>
                <hr></hr>
                <div className="recruiter-home-bottom">
                    <div className="recruiter-jobs-container">
                        {
                            jobs.map((job, index) =>
                                <RecruitersJobCard key = {index} job = {job} applied = {5}/>
                            )
                        }
                    </div>
                    <UpcomingCard event = {events}/>
                </div>
            </div>
        </>
    )
}


export default RecruiterHome