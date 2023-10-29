import axios from "axios";
// import { response } from "express";
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
                job_id : props.job.job_id
              }
            })
            .then(response => {
              props.fetchTemp()
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
                <h1>{props.job.Title}</h1>
                <h3>{props.job.company}, {props.job.Location}</h3>
                <h3>{props.job.category}</h3>
              </div>
              <div className="apply-container"> 
                <AppliedButtons app_id = {props.job.App_id} ActiveTab = {props.ActiveTab} Apply={Apply} fetchTemp={props.fetchTemp}/>
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

function AppliedButtons(props){

  const Withdraw = () => {
    axios.post('http://localhost:3000/candidate/appliedjobs/withdraw',{
      params: {
        app_id : props.app_id
      }
    })
    .then(response => {
      props.fetchTemp()
    })
    .catch(error => {
      console.log("Error while Withdrawing application")
    })
  }

  const Accept = () => {
    axios.post('http://localhost:3000/application/statuschange',{
      app_id: props.app_id,
      tostatus: 'Accepted'
    })
    .then(response => {
      props.fetchTemp()
    })
    .catch(error => {
      console.log("Error while accepting application")
    })
  }

  const Reject = () => {
    axios.post('http://localhost:3000/application/statuschange',{
      app_id: props.app_id,
      tostatus: 'Candidate_Rejected'
    })
    .then(response => {
      props.fetchTemp()
    })
    .catch(error => {
      console.log("Error while rejecting application")
    })
  }

  return(
    <>
      {(props.ActiveTab === "Pending" || props.ActiveTab === "Shortlisted") 
      && <button className="Withdraw applied-jobs-button" onClick={Withdraw}>Withdraw</button>}
      {props.ActiveTab === "Offered" 
        && 
        <>
          <button className="Accept applied-jobs-button" onClick={Accept}>Accept</button>
          <button className="Reject applied-jobs-button" onClick={Reject}>Reject</button>
        </>
      }
      {
        props.ActiveTab === "Rejected"? <button className="Rejected applied-jobs-button" disabled>Rejected</button>:null
      }

      {props.ActiveTab != null ? null:<button className="apply-button" onClick={props.Apply}>Apply</button>} {/*onClick={Apply}*/}
    </>
  )
}

export default SelectedJobInfo