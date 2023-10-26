import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import JobInfo from "../components/JobInfo";
import UpcomingCard from "../components/UpcomingCard";
import RecommendedCard from "../components/recommendedCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './CandidateHome.css';

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

function CandidateHome(){
    return(
        <>
            <Navbar userType = {"candidate"}/>
            <RecommendedJobs recJobs = {jobs}/> 
            <Search/>
            <div className="candidate-bottom">
                <JobInfo jobs = {jobs}/>
                <div className="candidate-upcoming">
                    <UpcomingCard event={events}/>
                </div>
            </div>
        </>
    )
}

function RecommendedJobs(props){
    return(
        <div className="recommended-jobs-section">
            <div>   
                <h2>Recommended Jobs for you</h2>
                <div>
                    <div>
                        {props.recJobs.map((job, index) =>
                            <RecommendedCard 
                                key = {index}
                                title = {job.title}
                                company = {job.company}
                                location = {job.location}
                                category = {job.category}
                            />
                        )}
                    </div>
                    <div>
                        <Viewmore/>
                    </div>
                </div>
                
            </div>
            <hr></hr>
        </div>
    )
}

function Viewmore(){
    return(
        <div className="view-more">
            <h4>View more</h4>
            <FontAwesomeIcon size="lg" icon={faPlus} />
        </div>
    )
}

export default CandidateHome;