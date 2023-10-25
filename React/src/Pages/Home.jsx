import React, {useState,useEffect} from "react";
import Navbar from "../components/Navbar"
import Search from "../components/Search";
import JobInfo from "../components/JobInfo";
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
        <Navbar userType = "none"/>
        <Search/>
        <JobInfo jobs = {jobs}/>
      </>
    )
}

export default Home