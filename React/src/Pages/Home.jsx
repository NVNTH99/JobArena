import React, {useState,useEffect} from "react";
import Navbar from "../components/Navbar"
import Search from "../components/Search";
import JobInfo from "../components/JobInfo";
import './Home.css';

function Home(){
    const [jobs,setJobs] = useState([])

    return (
      <>
        <Navbar userType = "none"/>
        <Search setData={setJobs}/>
        <JobInfo jobs = {jobs}/>
      </>
    )
}


export default Home