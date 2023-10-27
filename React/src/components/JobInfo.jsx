import React, {useState,useEffect} from "react";
import JobTitle from "./JobTitle";
import SelectedJobInfo from "./SelectedJobInfo";

const JobInfo = React.memo((props)=>{
    const [currentJob, setJobDetails] = useState("");
  
    return(
      <div className="job-info">
        <div className="job-list">
          {
            props.jobs.map((job, index) => 
            <JobTitle
              job_id ={job.job_id}
              key = {index}
              title = {job.title}
              company = {job.company}
              location = {job.location}
              category = {job.category}
              description = {job.description}
              setprop = {setJobDetails}
            />)
          }
        </div>
        <div className="homejob-right">
            {currentJob === ""? null : 
                <SelectedJobInfo
                    user_id = {props.user_id}
                    job_id = {currentJob.job_id}
                    title = {currentJob.title}
                    company = {currentJob.company}
                    location = {currentJob.location}
                    category = {currentJob.category}
                    description = {currentJob.description}
                />
            }
        </div>
      </div>
    )
})

export default JobInfo;
  