import React, {useState,useEffect} from "react";
import JobTitle from "./JobTitle";
import SelectedJobInfo from "./SelectedJobInfo";

const JobInfo = React.memo((props)=>{
    const [currentJob, setJobDetails] = useState('');
    let user_id = null
    if(props.user_id){
      user_id = props.user_id
    }

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
              job_id ={job.job_id}
              key = {index}
              title = {job.Title}
              company = {job.company}
              location = {job.Location}
              category = {job.category}
              description = {job.Description}
              setprop = {setJobDetails}
            />)
          }
        </div>
        <div className="homejob-right">
            {currentJob === ""? null : 
                <SelectedJobInfo
                    user_id = {user_id} //From home we arent passing anything so correct that
                    job_id = {currentJob.job_id}
                    title = {currentJob.title}
                    company = {currentJob.company}
                    location = {currentJob.location}
                    category = {currentJob.category}
                    description = {currentJob.description}
                    ActiveTab = {props.ActiveTab}
                />
            }
        </div>
      </div>
    )
})

export default JobInfo;
  