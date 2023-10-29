import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import JobInfo from "../components/JobInfo";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import "./CandidateRecommendedJobs.css";
import { useLocation } from "react-router-dom";

// var jobs = [
//     {
//       title:"Job Title", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//       title:"Job 2", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     },
//     {
//       title:"Job 3", 
//       company: "Company Name", 
//       location:"Location", 
//       category: "Category", 
//       description:"Short description of the job - Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for "
//     }
// ]

// var upcoming = [
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
//     {title:"Job Title", name:"Candidate Name", id:"#CandidateID" , date:"dd/mm/yyyy", time:"hh:mm"},
// ]
// var events = {"upcoming":upcoming};

function CandidateRecommendedJobs(){
    const location = useLocation()
    const user_id = location.state
    const [recJobs,setrecjobs] = useState([])
    const [events, setevents] = useState({})

    useEffect(()=>{
        console.log(user_id)
        axios.get('http://localhost:3000/candidate/recommended', {
            params: {
                user_id : user_id
                // limit : 3
            }
        })
        .then(response => {
            setrecjobs(response.data)
        })
        .catch(error => {
            console.error('Error fetching records', error);
        })
        axios.get('http://localhost:3000/candidate/upcoming', {
            params: {
                user_id : user_id,
            }
        })
        .then(response => {
            setevents({"upcoming":response.data})
        })
        .catch(error => {
            console.error('Error fetching records', error);
        })
    },[])

    return(
        <>
        <Navbar userType = {"candidate"}/>
        <Heading title = "Recommended jobs for you" />
        <div className="recommended-jobs-body">
            <div className="candidate-bottom">
                {/* <JobInfo jobs = {recJobs}/> */}
                {recJobs && <JobInfo jobs = {recJobs} user_id={user_id}/>}
                <div className="candidate-upcoming">
                    {/* <UpcomingCard event={events}/> */}
                    {events.upcoming && <CandidateUpcomingCard upcoming={events.upcoming}/>}
                </div>
            </div>
        </div>
        </>
    )
}

export default CandidateRecommendedJobs