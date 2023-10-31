import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import axios from "axios";

// const temp = [
//     {
//         title:"Job Title", 
//         company: "Company Name", 
//         location:"Location", 
//         category: "Category", 
//         description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//         title:"Job 2", 
//         company: "Company Name", 
//         location:"Location", 
//         category: "Category", 
//         description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//         title:"Job 3", 
//         company: "Company Name", 
//         location:"Location", 
//         category: "Category", 
//         description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     }
// ];

// const Jobs = {"Pending": temp, "Shortlisted": temp, "Offered": temp, "Rejected": temp};

// var upcoming = [
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {company: "Company Name", location: "Location", title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
// ];

var tabs = [
    {name: "Pending", icon: faClock},
    {name: "Shortlisted", icon: faListCheck},
    {name: "Offered", icon: faCheck},
    {name: "Rejected", icon: faXmark},
];

function CandidateAppliedJobs(){
    const location = useLocation()
    const user_id = location.state
    // console.log("This",user_id)
    const [temp,setTemp] = useState([])
    const [Jobs,setJobs] = useState({"Pending": [], "Shortlisted": [], "Offered": [], "Rejected": []})
    const[upcoming,setupcoming] = useState([])
    const [ActiveTab, setActiveTab] = useState("Pending");

    const fetchTemp = () => {
        axios.get('http://localhost:3000/candidate/appliedjobs',{
            params: {
                user_id: user_id
            }
        })
        .then(response => {
            setTemp(response.data)
        })
        .catch(error => {
            console.log("Error fetching Applied jobs")
        })
    }

    useEffect(()=>{
        fetchTemp()
    },[])

    useEffect(()=>{
        if(temp){
            let jobs = {"Pending": [], "Shortlisted": [], "Offered": [], "Rejected": []}
            for(let i=0; i<temp.length; i++){
                if(temp[i].status === 'Pending')
                    jobs.Pending.push(temp[i])
                else if(temp[i].status === 'Shortlisted')
                    jobs.Shortlisted.push(temp[i])
                else if(temp[i].status === 'Offered')
                    jobs.Offered.push(temp[i])
                else if(temp[i].status === 'Rejected')
                    jobs.Rejected.push(temp[i])
            }
            setJobs(jobs)
        }
    },[temp])

    useEffect(()=>{
        axios.get('http://localhost:3000/candidate/upcoming', {
            params: {
                user_id : user_id,
            }
        })
        .then(response => {
            setupcoming(response.data)
        })
        .catch(error => {
            console.log("Error fetching Upcoming events")
        })
    },[temp])

    return(
        <>
            <Navbar userType = "candidate" user_id = {user_id}/>
            <Heading title = "Applied Jobs"/>
            <div className="applied-jobs-body">
                <div className="applied-info">
                    <div>
                        {Jobs && <AppliedTabs jobs = {Jobs} selectedStatus = {setActiveTab}/>}
                    </div>
                    <div className="applied-tab-info">
                        {Jobs && ActiveTab && <JobInfo jobs = {Jobs[ActiveTab]} ActiveTab={ActiveTab} fetchTemp={fetchTemp}/>}
                    </div>
                </div>
                <div className="candidate-upcoming-section">
                    {upcoming && <CandidateUpcomingCard upcoming = {upcoming}/>}
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