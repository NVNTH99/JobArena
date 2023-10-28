import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateTab from "../components/CandidateTab";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CandidateAppliedJobs.css";

var upcoming = [
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]

var tabs = [
    {name: "Pending", icon: faClock},
    {name: "Shortlisted", icon: faListCheck},
    {name: "Offered", icon: faCheck},
    {name: "Rejected", icon: faXmark},
]

function CandidateAppliedJobs(){
    return(
        <>
            <Navbar userType = "candidate"/>
            <Heading title = "Applied Jobs"/>
            <div className="applied-jobs-body">
                <div className="applied-info">
                    <div>
                        <div className="applied-tabs">
                            <div>
                                {tabs.map((tab, index) =>
                                    <CandidateTab 
                                        key = {index} 
                                        tabName = {tab.name} 
                                        icon = {tab.icon}
                                        type = {tab.name}
                                    />
                                )}
                            </div>
                            <hr></hr>
                        </div>
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