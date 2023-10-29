import React, {useState,useEffect} from "react";
import JobTitle from "./JobTitle";
import SelectedJobInfo from "./SelectedJobInfo";

const JobInfo = React.memo((props)=>{
    const [currentJob, setJobDetails] = useState("");

    useEffect(()=>{
      if(props.selectedRecommendedJob)
        setJobDetails(props.selectedRecommendedJob);
    },[props.selectedRecommendedJob])
  
    return(
      <div className="job-info">
        <div className="job-list">
          {
            props.jobs.map((job, index) => 
            <JobTitle
              key = {index}
              job = {job}
              // title = {job.title}
              // company = {job.company}
              // location = {job.location}
              // category = {job.category}
              // description = {job.description}
              setprop = {setJobDetails}
            />)
          }
        </div>
        <div className="homejob-right">
            {currentJob === ""? null : 
                <SelectedJobInfo
                    job = {currentJob}
                    // title = {currentJob.title}
                    // company = {currentJob.company}
                    // location = {currentJob.location}
                    // category = {currentJob.category}
                    // description = {currentJob.description}
                    ActiveTab = {props.ActiveTab}
                />
            }
        </div>
      </div>
    )
})

export default JobInfo;
  