import React from "react";
import Navbar from "../components/Navbar";
import TabGroup from "../components/TabGroup";
import "./JobApplication.css";

var job = {title:"Job Title", companyName:"Company name", location:"Location", category:"Category",
description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for"}

// hardcoded data for testing
var candidate_list = [
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"rejected"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"rejected"},
    {name:"Candidate Name", id:"#CandidateID", status:"pending"},
    {name:"Candidate Name", id:"#CandidateID", status:"invited"},
]

var candidateList = {"pending":[],"rejected":[],"invited":[]};
for(var i=0;i<candidate_list.length;i++){
    if (candidate_list[i].status==="pending")
        candidateList.pending.push(candidate_list[i]);
    if (candidate_list[i].status==="rejected")
        candidateList.rejected.push(candidate_list[i]);
    if (candidate_list[i].status==="invited")
        candidateList.invited.push(candidate_list[i]);
}

function JobApplication(){
    return(
        <div className="job-app">
            <Navbar/>
            <div className="box">
                <div className="left">
                    <div className="margin">
                        <h2 className="job_application">{job.title}</h2>
                        <h2 className="job_application">{job.companyName + ", " + job.location}</h2>
                        <h2 className="job_application">{job.category}</h2>
                        <br/>
                        <p className="job_application">{job.description}</p>
                        
                    </div>
                    <hr/>
                    <h3 className="job_application heading2">{candidate_list.length} Application(s) recieved</h3>
                    <TabGroup candidateList={candidateList}/> 
                </div>
                <div className="right">
                    
                </div>
            </div>
        </div>
    )
}

export default JobApplication