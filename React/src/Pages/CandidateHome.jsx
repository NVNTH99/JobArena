import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import JobInfo from "../components/JobInfo";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import RecommendedCard from "../components/recommendedCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './CandidateHome.css';
import { useLocation } from "react-router-dom";
import axios from 'axios'

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
// ]

// var upcoming = [
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
// ]
// var events = {"upcoming":upcoming};
// const [upcoming, setupcoming] = useState([])
// let upcoming = []

function CandidateHome(){
    const location = useLocation()
    const user_id = location.state
    // console.log(user_id)
    const [recJobs,setrecjobs] = useState([])
    const [jobs,setJobs] = useState([])
    const [events, setevents] = useState({"upcoming":[]})
    const [selectedRecommendedJob, setSelectedRecommendedJob] = useState(null);

    const fetchRec = () => {
        axios.get('http://localhost:3000/candidate/recommended', {
            params: {
                user_id : user_id,
                limit : 3
            }
        })
        .then(response => {
            setrecjobs(response.data)
        })
        .catch(error => {
            console.error('Error fetching records', error);
        })
    }

    useEffect(()=>{
        fetchRec()
    },[])

    useEffect(()=>{
        // console.log(user_id)
        // fetchRec()
        axios.get('http://localhost:3000/candidate/upcoming', {
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
    },[recJobs])

    // useEffect(()=>{
    //     // console.log(user_id)
    //     axios.get('http://localhost:3000/candidate/upcoming', {
    //         params: {
    //             user_id : user_id,
    //         }
    //     })
    //     .then(response => {
    //         setevents({"upcoming":response.data})
    //     })
    //     .catch(error => {
    //         console.error('Error fetching records', error);
    //     })
    // },[])

    // useEffect(()=>{
    // },[upcoming])
    
    
    return(
        <>
            <Navbar userType = {"candidate"} user_id = {user_id}/>
            {recJobs && <RecommendedJobs recJobs = {recJobs} user_id={user_id} setSelectedRecommendedJob = {setSelectedRecommendedJob}/>} {/* change to recJobs */}
            <Search setData={setJobs} recJobs={recJobs} user_id={user_id}/>
            <div className="candidate-bottom">
                {jobs && <JobInfo jobs = {jobs} user_id={user_id} selectedRecommendedJob = {selectedRecommendedJob} fetchTemp={fetchRec}/>} {/*user_id={user_id}*/}
                <div className="candidate-upcoming">
                    {events.upcoming && <CandidateUpcomingCard upcoming={events.upcoming}/>}
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
                                // job_id = {job.job_id}
                                // title = {job.Title}
                                // company = {job.company}
                                // location = {job.Location}
                                // category = {job.category}
                                job = {job}
                                setSelectedRecommendedJob = {props.setSelectedRecommendedJob}
                            />
                        )}
                    </div>
                    <div>
                        <Viewmore user_id={props.user_id}/>
                    </div>
                </div>    
            </div>
            <hr></hr>
        </div>
    )
}

function Viewmore(props){
    return(
        <Link className="view-more" to="/candidate/recommended_jobs" state={props.user_id}>
            <h4>View more</h4>
            <FontAwesomeIcon size="lg" icon={faPlus} />
        </Link>
    )
}

export default CandidateHome;