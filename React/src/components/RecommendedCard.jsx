import React from "react";

function RecommendedCard(props){
    return(
        <div className="recommended-job-card">
            <h4>{props.title}</h4>
            <h4>{props.company}, {props.location}</h4>
            <h4>{props.category}</h4>
        </div>
    )
}

export default RecommendedCard