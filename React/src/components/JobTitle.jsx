import React from "react";

function JobTitle(props){

    const handleClick = () => {
        const newJob = {
            job_id: props.job_id,
            title: props.title,
            company: props.company,
            location: props.location,
            category: props.category,
            description: props.description
        }
        props.setprop(newJob);
    };

    return(
        <div className="job-title-card" onClick={handleClick}>
                <h4>{props.title}</h4>
                <h4>{props.company}, {props.location}</h4>
                <h4>{props.category}</h4>

                <p>
                    {props.description}
                </p>
        </div>
    )
}

export default JobTitle;