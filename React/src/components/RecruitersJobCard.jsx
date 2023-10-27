import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function RecruitersJobCard(props){
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
                <button className="rec-job-card-button red">
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