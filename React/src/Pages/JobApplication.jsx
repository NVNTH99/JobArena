import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import TabGroup from "../components/TabGroup";
import "./JobApplication.css";
import UpcomingCard from "../components/UpcomingCard";
import { useLocation } from "react-router-dom"; //Added by Nava
import axios from "axios"; //Added by Nava
// import { response } from "express";

// var job = {title:"Job Title", companyName:"Company name", location:"Location", category:"Category",
// description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishingindustries for"}

// // hardcoded data for testing
// var candidate_list = [
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:1234},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:4354},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:5462},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:2367},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:2346},
//     {name:"Candidate Name", id:"#CandidateID", status:"rejected", App_id:2467},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:3345},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:4567},
//     {name:"Candidate Name", id:"#CandidateID", status:"rejected", App_id:2345},
//     {name:"Candidate Name", id:"#CandidateID", status:"pending", App_id:3457},
//     {name:"Candidate Name", id:"#CandidateID", status:"shortlisted", App_id:6969},
// ]

// var upcoming = [
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
// ]
// var events = {"upcoming":upcoming};

// var candidateList = {"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]};
// for(var i=0;i<candidate_list.length;i++){
//     if (candidate_list[i].status==="pending")
//         candidateList.Pending.push(candidate_list[i]);
//     else if (candidate_list[i].status==="rejected")
//         candidateList.Rejected.push(candidate_list[i]);
//     else if (candidate_list[i].status==="shortlisted")
//         candidateList.Shortlisted.push(candidate_list[i]);
//     else if (candidate_list[i].status==="offered")
//         candidateList.Offered.push(candidate_list[i]);
// }

let length = 0

function JobApplication(){
    const location = useLocation() //Added by Nava
    const {job_id,user_id} = location.state //Added by Nava
    console.log(job_id,user_id)
    const [job,setJob] = useState({}) //Added by Nava
    const [events,setevents] = useState({"upcoming":[]}) //Added by Nava
    const [candidateList,setcandidateList] = useState({"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]}) //Added by Nava
    
    useEffect(()=> {
        axios.get('http://localhost:3000/recruiter/job',{
            params : {
                job_id: job_id
            }
        })
        .then(response => {
            setJob(response.data)
        })
        .catch(error => {
            console.log("Error fetching job details")
        })
    },[]) //Added by Nava

    useEffect(()=> {
        axios.get('http://localhost:3000/recruiter/upcoming',{
            params: {
                user_id: user_id
            }
        })
        .then(response => {
            setevents({"upcoming":response.data})
        })
        .catch(error => {
            console.log("Error fetching upcoming events")
        })
    },[candidateList]) //Added by Nava

    const fetchCand = () => {
        axios.get('http://localhost:3000/recruiter/job/candidates',{
            params : {
                job_id : job_id
            }
        })
        .then(response => {
            const candidate_list = response.data
            length = candidate_list.length // Getting length to pass in h2
            let candidateList = {"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]};
            for(let i=0;i<candidate_list.length;i++){
                if (candidate_list[i].status==="Pending")
                    candidateList.Pending.push(candidate_list[i]);
                else if (candidate_list[i].status==="Rejected")
                    candidateList.Rejected.push(candidate_list[i]);
                else if (candidate_list[i].status==="Shortlisted")
                    candidateList.Shortlisted.push(candidate_list[i]);
                else if (candidate_list[i].status==="Offered"||candidate_list[i].status==="Accepted"||candidate_list[i].status==="Candidate_Rejected")
                    candidateList.Offered.push(candidate_list[i]);
            }
            setcandidateList(candidateList)
        }) //This might give error
        .catch(error => {
            console.log("Error fetching candidates")
        })
    }

    useEffect(()=> {
        fetchCand()
    },[]) //Added by Nava

    return(
        <div className="job-app">
            <Navbar userType="recruiter" user_id = {user_id}/>
            <div className="box">
                <div className="left">
                    <div className="margin">
                        <h3 className="job_application heading_size">{job.title}</h3>
                        <h3 className="job_application heading_size">{job.companyName + ", " + job.location}</h3>
                        <h3 className="job_application heading_size">{job.category}</h3>
                        <br/>
                        <p className="job_application desc">{job.description}</p>
                        
                    </div>
                    <hr/>
                    <h2 className="job_application heading2">{length} Application(s) recieved</h2>
                    {candidateList.Pending && candidateList.Rejected && candidateList.Shortlisted && candidateList.Offered && <TabGroup candidateList={candidateList} fetchCand={fetchCand} user_id={user_id} />} {/*In case of error check here*/}
                </div>
                <div className="right">
                    {events.upcoming && <UpcomingCard event={events.upcoming}/>} {/*In case of error check here*/}
                </div>
            </div>
        </div>
    )
}

export default JobApplication