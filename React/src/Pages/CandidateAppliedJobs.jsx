import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";

function CandidateAppliedJobs(){
    return(
        <>
            <Navbar userType = "candidate"/>
            <Heading title = "Applied Jobs"/>
        </>
    )
}

export default CandidateAppliedJobs;