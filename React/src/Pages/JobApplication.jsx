import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import TabGroup from "../components/TabGroup";
import "./JobApplication.css";
import UpcomingCard from "../components/UpcomingCard";
import { useLocation } from "react-router-dom"; //Added by Nava
import { response } from "express";

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

function JobApplication(){
    const location = useLocation() //Added by Nava
    const {user_id,job_id} = location.state //Added by Nava
    const [job,setJob] = useState({}) //Added by Nava
    const [events,setevents] = useState({"upcoming":[]}) //Added by Nava
    const [candidateList,setcandidateList] = useState({"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]}) //Added by Nava
    let length
    
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
    },[]) //Added by Nava

    useEffect(()=> {
        axios.get('http://localhost:3000/job/candidates',{
            params : {
                job_id : job_id
            }
        })
        .then(response => {
            const candidate_list = response.data
            length = candidate_list.length // Getting length to pass in h2
            let candidateList = {"Pending":[],"Rejected":[],"Shortlisted":[],"Offered":[]};
            for(let i=0;i<candidate_list.length;i++){
                if (candidate_list[i].status==="pending")
                    candidateList.Pending.push(candidate_list[i]);
                else if (candidate_list[i].status==="rejected")
                    candidateList.Rejected.push(candidate_list[i]);
                else if (candidate_list[i].status==="shortlisted")
                    candidateList.Shortlisted.push(candidate_list[i]);
                else if (candidate_list[i].status==="offered")
                    candidateList.Offered.push(candidate_list[i]);
            }
            setcandidateList(candidateList)
        }) //This might give error
        .catch(error => {
            console.log("Error fetching candidates")
        })
    },[]) //Added by Nava

    return(
        <div className="job-app">
            <Navbar userType="recruiter"/>
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
                    <h2 className="job_application heading2">{length} Application(s) recieved</h2>
                    {candidateList.Pending && candidateList.Rejected && candidateList.Shortlisted && candidateList.Offered && <TabGroup candidateList={candidateList}/>} {/*In case of error check here*/}
                </div>
                <div className="right">
                    {events.upcoming && <UpcomingCard event={events.upcoming}/>} {/*In case of error check here*/}
                </div>
            </div>
        </div>
    )
}

export default JobApplication