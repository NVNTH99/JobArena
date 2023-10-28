import React from "react";
import {Link} from "react-router-dom";
import InviteRejectButton from "./InviteRejectButton";


function invite(App_id){
  // alert("you clicked invite for interview"+App_id);
  
}

function reject(App_id){
  alert("you clicked reject");
}

function accept(App_id){
  alert("you clicked accept");
}

function Button(status,App_id){
  if (status==="pending"){
    return(
      <>
        <InviteRejectButton/>
      </>
    )
  }
  if (status==="shortlisted"){
    return(
      <span className="inviteCard">
        <button className="acceptButton" onClick={()=>accept(App_id)}>Accept</button>
        <button className="rejectButton" onClick={()=>reject(App_id)}>Reject</button>
      </span>
    )
  }
  if (status==="accepted"){
    return(
      <span style={{color:"rgb(114, 210, 90)"}}>
        Accepted by candidate
      </span>
      
    )
  }
  if (status==="candidate_rejected"){
    return(
      <span style={{color:"rgb(228,107,107)"}}>
        Rejected by candidate
      </span>
      
    )
  }
  if (status==="offered"){
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
        <Link to={{
          pathname:"/recruiter/candidate_profile",
          state:{
            cand_id:props.candidate.id,
          }
        }}>{props.candidate.name}</Link> {props.candidate.id}
      </div>
      <div className="buttonSpan">{Button(props.candidate.status,props.candidate.App_id)}</div>
    </div>
  );
}

export default CandidateListCard;