import React from "react";
import Navbar from "../components/Navbar";
import JobInfo from "../components/JobInfo";
import UpcomingCard from "../components/UpcomingCard";
import "./CandidateRecommendedJobs.css";

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

function CandidateRecommendedJobs(){
    return(
        <>
        <Navbar userType = {"candidate"}/>
        <div className="recommended-jobs-body">
            <div className="recommended-jobs-top">
                <h1>Recommended jobs for you</h1>
                <hr></hr>
            </div>
            <div className="candidate-bottom">
                <JobInfo jobs = {jobs}/>
                <div className="candidate-upcoming">
                    <UpcomingCard event={events}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default CandidateRecommendedJobs