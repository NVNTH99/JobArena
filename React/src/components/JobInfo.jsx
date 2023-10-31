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
      setJobDetails('')
    },[props.ActiveTab])

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
              // app_id = {job.App_id}
              job = {job}
              setprop = {setJobDetails}
            />)
          }
        </div>
        <div className="homejob-right">
            {currentJob === ""? null : 
                <SelectedJobInfo
                    user_id = {user_id} //From home we arent passing anything so correct that
                    // app_id = {currentJob.app_id}
                    job = {currentJob}
                    ActiveTab = {props.ActiveTab}
                    fetchTemp = {props.fetchTemp}
                    setJobDetails = {setJobDetails}
                />
            }
        </div>
      </div>
    )
})

export default JobInfo;
  