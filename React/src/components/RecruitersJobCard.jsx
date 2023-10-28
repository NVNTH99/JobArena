import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { response } from "express";

function RecruitersJobCard(props){

    const deleteJob = (e) => {
        e.preventDefault(); // This idk might cause error, unnecessary so removable
        axios.post('http://localhost:3000/recruiter/removeJob',{
            params : {
                job_id: props.job.job_id,
                user_id: props.user_id
            }
        })
        .then(response => {
            props.setJobs(response.data)
        })
        .catch(error => {
            console.log("Error Occured while deleting Job")
        })
    }

    return(
        <div className="recruiters-job-card">
            <div className="recruiters-job-card-content">
                <h4>{props.job.title}</h4>
                <h4>{props.job.company}, {props.job.location}</h4>
                <h4>{props.job.category}</h4>

                <p>{props.job.description}</p>
            </div>
            <div className="recruiters-job-card-buttons">
                <button className="rec-job-card-button grey">
                    <p>Edit <FontAwesomeIcon icon={faPenToSquare}/></p>
                </button>
                <button className="rec-job-card-button red" onClick={deleteJob}>
                    <p>Delete <FontAwesomeIcon icon={faTrashCan}/></p>
                </button>
                <p className="applicants">
                    {props.applied} Applications received
                </p>
            </div>
        </div>
    )
}

export default RecruitersJobCard;