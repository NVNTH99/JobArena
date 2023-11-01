import React from "react";
import {Link} from "react-router-dom";
import InviteRejectButton from "./InviteRejectButton";
import axios from "axios";


function invite(App_id){
  // alert("you clicked invite for interview"+App_id);
  
}

function reject(App_id,fetchCand){
  axios.post('http://localhost:3000/application/statuschange',{
    app_id: App_id,
    tostatus: 'Rejected'
  })
  .then(response => {
    fetchCand()
  })
  .catch(error=> {
    console.log("Error while accepting application")
  })
}

function accept(App_id,fetchCand){
  alert("you clicked accept");
  axios.post('http://localhost:3000/application/statuschange',{
    app_id: App_id,
    tostatus: 'Offered'
  })
  .then(response => {
    fetchCand()
  })
  .catch(error=> {
    console.log("Error while accepting application")
  })
}

function Button(status,App_id,date,time,fetchCand){
  if (status==="Pending"){
    return(
      <>
        <InviteRejectButton fetchCand={fetchCand} app_id={App_id}/>
      </>
    )
  }
  if (status==="Shortlisted"){
    return(
      <span className="inviteCard">
        {date === null ? (
          <>
            <button className="acceptButton" onClick={() => accept(App_id,fetchCand)}>
              Accept
            </button>
            <button className="rejectButton" onClick={() => reject(App_id,fetchCand)}>
              Reject
            </button>
          </>
        ) : (
          <>
            <span className="pulse" style={{color:"#404040"}}>
              Interview scheduled on {date} at {time}
            </span>
          </>
        )}

      </span>
    )
  }
  if (status==="Accepted"){
    return(
      <span style={{color:"rgb(114, 210, 90)"}}>
        Accepted by candidate
      </span>
      
    )
  }
  if (status==="Candidate_Rejected"){
    return(
      <span style={{color:"rgb(228,107,107)"}}>
        Rejected by candidate
      </span>
      
    )
  }
  if (status==="Offered"){
    return(
      <span>
        Candidate response pending
      </span>
      
    )
  }
}


function CandidateListCard(props){
  return(
    <div className="card job_application">
      <div>
        {/* <Link to={{
          pathname:"/recruiter/candidate_profile",
          state:{
            cand_id:props.candidate.id,
          }
        }}>{props.candidate.name}</Link> #{props.candidate.id} */}
        <Link to="/recruiter/candidate_profile" state={{cand_id:props.candidate.id, user_id:props.user_id, app_id:props.candidate.App_id}}>
          {props.candidate.name}</Link> #{props.candidate.id}
      </div>
      <div className="buttonSpan">{Button(props.candidate.status,props.candidate.App_id,props.candidate.date,props.candidate.time,props.fetchCand)}</div>
    </div>
  );
}

export default CandidateListCard;