import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import UpcomingCard from "../components/UpcomingCard";
import "./RecruiterAddJob.css";

var upcoming = [
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]
var events = {"upcoming":upcoming};

function RecruiterAddJob(){
    return(
        <>
            <Navbar userType = "recruiter"/>
            <Heading title = "Add Job"/>
            <div>
                <div>

                </div>
                <UpcomingCard event = {events}/>
            </div>
        </>
    )
}

export default RecruiterAddJob