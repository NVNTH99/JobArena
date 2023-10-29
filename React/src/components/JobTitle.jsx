import React from "react";

function JobTitle(props){

    const handleClick = () => {
        // const newJob = {
        //     app_id: props.app_id,
        //     job_id: props.job_id,
        //     title: props.title,
        //     company: props.company,
        //     location: props.location,
        //     category: props.category,
        //     description: props.description
        // }
        props.setprop(props.job);
    };

    return(
        <div className="job-title-card" onClick={handleClick}>
                <h4>{props.job.Title}</h4>
                <h4>{props.job.company}, {props.job.Location}</h4>
                <h4>{props.category}</h4>

                <p>
                    {props.Description}
                </p>
        </div>
    )
}

export default JobTitle;