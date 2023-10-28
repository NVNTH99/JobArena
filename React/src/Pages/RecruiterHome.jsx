import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import UpcomingCard from "../components/UpcomingCard";
import RecruitersJobCard from "../components/RecruitersJobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./RecruiterHome.css";
import { useLocation } from "react-router-dom";

// var jobs = [
//     {
//       title:"Job Title", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//       title:"Job 2", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//       title:"Job 3", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     }
//   ]

//   var upcoming = [
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
// ]
// var events = {"upcoming":upcoming};

function RecruiterHome(){
    const location = useLocation() //Added by Nava
    const {user_id} = location.state //Added by Nava
    const [jobs,setJobs] = useState([]) //Added by Nava
    const [events,setevents] = useState({"upcoming":[]}) //Added by Nava
    // const [deleted,setDeleted] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost:3000/recruiter/jobs', {
            params: {
                user_id : user_id,
            }
        })
        .then(response => {
            setJobs(response.data)
        })
        .catch(error => {
            console.error('Error fetching records', error);
        })
    },[]) //Added by Nava

    useEffect(() => {
        axios.get('http://localhost:3000/recruiter/upcoming', {
            params: {
                user_id : user_id,
            }
        })
        .then(response => {
            setevents({"upcoming":response.data})
        })
        .catch(error => {
            console.error('Error fetching records', error);
        })
    },[jobs]) // Added by Nava

    return (
        <>
            <Navbar userType="recruiter"/>
            <div className="recruiter-home-body">
                <div>
                    <div>
                        <h1>Your Jobs</h1>
                    </div>
                    <div>
                        <Link className="add-job-button" to="/recruiter/add_job">
                            <p>Add Job</p>
                            <FontAwesomeIcon size="md" icon={faPlus}/>
                        </Link>
                    </div>    
                </div>
                <hr></hr>
                <div className="recruiter-home-bottom">
                    <div className="recruiter-jobs-container">
                        {
                            jobs && jobs.map((job, index) => //In case error occurs check here
                                <RecruitersJobCard 
                                    key = {index} 
                                    job = {job} 
                                    applied = {job.count} 
                                    user_id={user_id} 
                                    setJobs={setJobs} 
                                    // deleted={deleted} 
                                    // setDeleted={setDeleted}
                                /> //Nava put job.count, user_id, setJobs
                            )
                        }
                    </div>
                    {events.upcoming && <UpcomingCard event = {events}/>} {/*In case of error check here*/}
                </div>
            </div>
        </>
    )
}


export default RecruiterHome