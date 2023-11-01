import React from "react";

function RecommendedCard(props){
    const handleCardClick = () => {
        props.setSelectedRecommendedJob(props.job);
    };
    return(
        <div onClick = {handleCardClick} className="recommended-job-card">
            <h4>{props.job.title}</h4>
            <h4>{props.job.company}, {props.job.Location}</h4>
            <h4>{props.job.category}</h4>
        </div>
    )
}

export default RecommendedCard