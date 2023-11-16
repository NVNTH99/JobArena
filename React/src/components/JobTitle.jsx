import React from "react";

function JobTitle(props){

    const handleClick = () => {
        props.setprop(props.job);
    };

    return(
        <div className="job-title-card" onClick={handleClick}>
                <h4>{props.job.Title}</h4>
                <h4>{props.job.company}, {props.job.Location}</h4>
                <h4>{props.job.category}</h4>

                <p>
                    {props.job.Description}
                </p>
        </div>
    )
}

export default JobTitle;