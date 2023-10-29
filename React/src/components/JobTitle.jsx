import React from "react";

function JobTitle(props){

    const handleClick = () => {
        // const newJob = {
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
                <h4>{props.job.title}</h4>
                <h4>{props.job.company}, {props.job.location}</h4>
                <h4>{props.job.category}</h4>

                <p>
                    {props.job.description}
                </p>
        </div>
    )
}

export default JobTitle;