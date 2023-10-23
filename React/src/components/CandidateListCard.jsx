import React from "react";
import {Link} from "react-router-dom";


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
        <button className="inviteButton" onClick={()=>invite(App_id)}>Invite for interview</button>
        <button className="rejectButton" onClick={()=>reject(App_id)}>Reject</button>
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
}


function CandidateListCard(props){
  return(
    <div className="card job_application">
        <Link to={{
          pathname:"/recruiter/candidate_profile",
          state:{
            cand_id:props.candidate.id,
          }
        }}>{props.candidate.name}</Link> {props.candidate.id} <span className="buttonSpan">{Button(props.candidate.status,props.candidate.App_id)}</span>
    </div>
  );
}

export default CandidateListCard;