import React from "react";

function CandidateListCard(props){
  return(
    <div className="card job_application card">
        {props.candidate.name} {props.candidate.id}
    </div>
  );
}

export default CandidateListCard;