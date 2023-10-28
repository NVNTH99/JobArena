import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import JobInfo from "../components/JobInfo";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
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
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]


function CandidateRecommendedJobs(){
    return(
        <>
        <Navbar userType = {"candidate"}/>
        <Heading title = "Recommended jobs for you" />
        <div className="recommended-jobs-body">
            <div className="candidate-bottom">
                <JobInfo jobs = {jobs}/>
                <div className="candidate-upcoming">
                    <CandidateUpcomingCard upcoming = {upcoming}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default CandidateRecommendedJobs