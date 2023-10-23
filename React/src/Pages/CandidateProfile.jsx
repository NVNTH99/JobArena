import React from "react";
import Navbar from "../components/Navbar";
import "./CandidateProfile.css";
import UpcomingCard from "../components/UpcomingCard";

var upcoming = [
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
    {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
]
var events = {"upcoming":upcoming};

function CandidateProfle(){
    return(
        <div className="candpro">
            <Navbar/>
            <h2>Candidate Details</h2>
            <hr/>
            <div className="left">
                <div className="leftbox">

                </div>
                <div className="rightbox">

                </div>
            </div>
            <div className="right">
                <UpcomingCard event={events}/>
            </div>
        </div>
    )
}

export default CandidateProfle