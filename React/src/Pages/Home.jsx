import React, {useState} from "react";
import Navbar from "../components/Navbar"
import Search from "../components/Search";
import JobTitle from "../components/JobTitle";
import SelectedJobInfo from "../components/SelectedJobInfo";
import './Home.css';

var jobs = [
  {
    title:"Job Title", 
    company: "Company Name", 
    location:"Location", 
    category: "Category", 
    description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
  },
  {
    title:"Job 2", 
    company: "Company Name", 
    location:"Location", 
    category: "Category", 
    description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
  },
  {
    title:"Job 3", 
    company: "Company Name", 
    location:"Location", 
    category: "Category", 
    description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
  }
]

function Home(){
    return (
      <>
        <Navbar/>
        <Search/>
        <JobInfo/>
      </>
    )
}

function JobInfo(){
  const [currentJob, setJobDetails] = useState("");

  return(
    <div className="job-info">
      <div className="job-list">
        {
          jobs.map((job, index) => 
          <JobTitle
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
}


export default Home