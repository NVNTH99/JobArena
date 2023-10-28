import axios from "axios";
// import { response } from "express";
import React from "react";
import { useNavigate } from 'react-router-dom';


function SelectedJobInfo(props){
    const navigate = useNavigate();

    const Apply = () => {
        if(props.user_id === null){
            navigate('/login')
        }
        else{
            axios.post('http://localhost:3000/candidate/jobapply',{
              params: {
                user_id : props.user_id,
                job_id : props.job_id
              }
            })
            .then(response => {
              //Try to update the jobs list in the candidate home page
            })
            .catch(error => {
              console.log("Internal Server Error applying for job")
            })
        }
    }

    return(
        <div className="selected-job-info">

          <div className="selected-job-top">
            <div>
              <div>
                <h1>{props.title}</h1>
                <h3>{props.company}, {props.location}</h3>
                <h3>{props.category}</h3>
              </div>
              <div className="apply-container"> 
                <button className="apply-button" onClick={Apply}>Apply</button> {/*onClick={Apply}*/}
              </div>
            </div>
            <hr></hr>
          </div>

          <div className="selected-job-bottom">
            <h2>Job Description:</h2>
          </div>

        </div>
    )
}

export default SelectedJobInfo