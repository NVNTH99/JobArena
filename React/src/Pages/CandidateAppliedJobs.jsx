import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import "./CandidateAppliedJobs.css";

var upcoming = [
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]

function CandidateAppliedJobs(){
    return(
        <>
            <Navbar userType = "candidate"/>
            <Heading title = "Applied Jobs"/>
            <div className="applied-jobs-body">
                <div className="applied-info">
                    <div className="applied-tabs">
                        hello
                    </div>
                    <div className="applied-tab-info">
                        <div className="applied-tab-list">

                        </div>
                        <div className="selected-applied-job-info">

                        </div>
                    </div>
                </div>
                <div className="candidate-upcoming-section">
                    <CandidateUpcomingCard upcoming = {upcoming}/>
                </div>
            </div>
        </>
    )
}

export default CandidateAppliedJobs;