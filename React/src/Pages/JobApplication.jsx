import React from "react";
import Navbar from "../components/Navbar";
import TabGroup from "../components/TabGroup";
import "./JobApplication.css";
import UpcomingCard from "../components/UpcomingCard";


var job = {title:"Job Title", companyName:"Company name", location:"Location", category:"Category",
description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for"}

// hardcoded data for testing
var candidate_list = [
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:1234},
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:4354},
    {name:"Candidate Name", id:"#CandidateID", status:"accepted", App_id:5462},
    {name:"Candidate Name", id:"#CandidateID", status:"candidate_rejected", App_id:2367},
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:2346},
    {name:"Candidate Name", id:"#CandidateID", status:"rejected", App_id:2467},
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:3345},
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:4567},
    {name:"Candidate Name", id:"#CandidateID", status:"rejected", App_id:2345},
    {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:3457},
    {name:"Candidate Name", id:"#CandidateID", status:"shortlisted", App_id:6969},
    {name:"Candidate Name", id:"#CandidateID", status:"offered", App_id:6960},
]

var upcoming = [
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]
// var events = {"upcoming":upcoming};

var candidateList = {"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]};
for(var i=0;i<candidate_list.length;i++){
    if (candidate_list[i].status==="pending")
        candidateList.Pending.push(candidate_list[i]);
    else if (candidate_list[i].status==="rejected")
        candidateList.Rejected.push(candidate_list[i]);
    else if (candidate_list[i].status==="shortlisted")
        candidateList.Shortlisted.push(candidate_list[i]);
    else if (candidate_list[i].status==="offered" || candidate_list[i].status==="accepted" || candidate_list[i].status==="candidate_rejected")
        candidateList.Offered.push(candidate_list[i]);
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
                        <p className="job_application desc">{job.description}</p>
                        
                    </div>
                    <hr/>
                    <h2 className="job_application heading2">{candidate_list.length} Application(s) recieved</h2>
                    <TabGroup candidateList={candidateList}/> 
                </div>
                <div className="right">
                    <UpcomingCard event={upcoming}/>
                </div>
            </div>
        </div>
    )
}

export default JobApplication