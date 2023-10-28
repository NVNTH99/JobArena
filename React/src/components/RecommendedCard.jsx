import React from "react";

function RecommendedCard(props){
    const handleCardClick = () => {
        props.setSelectedRecommendedJob(props);
    };
    return(
        <div onClick = {handleCardClick} className="recommended-job-card">
            <h4>{props.title}</h4>
            <h4>{props.company}, {props.location}</h4>
            <h4>{props.category}</h4>
        </div>
    )
}

export default RecommendedCard