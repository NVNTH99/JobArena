import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateTab from "../components/CandidateTab";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import JobInfo from "../components/JobInfo";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CandidateAppliedJobs.css";

const temp = [
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
];

const Jobs = {"Pending": temp, "Shortlisted": temp, "Offered": temp, "Rejected": temp};

var upcoming = [
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
];

var tabs = [
    {name: "Pending", icon: faClock},
    {name: "Shortlisted", icon: faListCheck},
    {name: "Offered", icon: faCheck},
    {name: "Rejected", icon: faXmark},
];

function CandidateAppliedJobs(){
    const [ActiveTab, setActiveTab] = useState("Pending");
    return(
        <>
            <Navbar userType = "candidate"/>
            <Heading title = "Applied Jobs"/>
            <div className="applied-jobs-body">
                <div className="applied-info">
                    <div>
                        <AppliedTabs jobs = {Jobs} selectedStatus = {setActiveTab}/>
                    </div>
                    <div className="applied-tab-info">
                        <JobInfo jobs = {Jobs[ActiveTab]} ActiveTab={ActiveTab}/>
                    </div>
                </div>
                <div className="candidate-upcoming-section">
                    <CandidateUpcomingCard upcoming = {upcoming}/>
                </div>
            </div>
        </>
    )
}

function AppliedTabs(props){
    return(
        <div className="applied-tabs">
            <div>
                {tabs.map((tab, index) =>
                    <CandidateTab 
                        key = {index} 
                        tabName = {tab.name} 
                        icon = {tab.icon}
                        cardCount = {props.jobs[tab.name].length}
                        setActiveTab = {props.selectedStatus}
                    />
                )}
            </div>
            <hr></hr>
        </div>
    )
}

export default CandidateAppliedJobs;