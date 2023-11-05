import React, { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import "./RecruiterCandidateProfile.css";
import UpcomingCard from "../components/UpcomingCard";
import InviteRejectButton from "../components/InviteRejectButton";
import axios from "axios";
import { useLocation } from "react-router-dom";

function reject(App_id,fetchApp){
  alert("you clicked reject");
  alert("you clicked accept");
  axios.post(`${import.meta.env.VITE_ROOT}/application/statuschange`,{
    app_id: App_id,
    tostatus: 'Rejected'
  })
  .then(response => {
    fetchApp()
  })
  .catch(error=> {
    console.log("Error while accepting application")
  })
}

function accept(App_id,fetchApp){
  alert("you clicked accept");
  axios.post(`${import.meta.env.VITE_ROOT}/application/statuschange`,{
    app_id: App_id,
    tostatus: 'Offered'
  })
  .then(response => {
    fetchApp()
  })
  .catch(error=> {
    console.log("Error while accepting application")
  })
}

function Button(props) {
  // let status = status.status;
  if (props.application.status === "Pending") { 
    return(
      <div className="cand_pro_buttons">
        <InviteRejectButton fetchCand={props.fetchApp} app_id={props.app_id}/>
      </div>
    )
  } else if (props.application.status === "Shortlisted" && props.application.link === null) {
    return (
      <div className="cand_pro_buttons">
        {props.application.date}
        <button className="acceptButton" onClick={() => accept(props.app_id,props.fetchApp)}>Accept</button>
        <button className="rejectButton"  onClick={() => reject(props.app_id,props.fetchApp)}>Reject</button>
      </div>
    );
  }
}

function CandidateProfle() {
  const [candidate, setCandidate] = useState([])
  const [upcoming,setupcoming] = useState([])
  const [application,setapplication] = useState({})
  const location = useLocation() //Added by Nava
  const {cand_id,user_id,app_id} = location.state //Added by Nava
  console.log(cand_id,user_id,app_id)
  // console.log(candidate)

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_ROOT}/recruiter/candidateprofile`,{
      params : {
        cand_id: cand_id
      }
    })
    .then(response => {
      console.log(response.data)
      setCandidate(response.data)
    })
    .catch(error => {
      console.log(error,"Error Retrieving candidate details")
    })
  },[])

  const fetchApp = () => {
    axios.get(`${import.meta.env.VITE_ROOT}/application`,{
        params: {
            app_id: app_id
        }
    })
    .then(response => {
        setapplication(response.data)
    })
    .catch(error => {
        console.log("Error fetching Application")
    })
  }

  useEffect(()=>{
    fetchApp()
  },[])

  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_ROOT}/recruiter/upcoming`,{
        params: {
            user_id: user_id
        }
    })
    .then(response => {
        setupcoming(response.data)
    })
    .catch(error => {
        console.log(error,"Error fetching upcoming events")
    })
},[application])

const handleDownload = () => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  const resumeData = candidate[0][0].Resume; // Assuming this is the resume data received
  const blob = new Blob([resumeData], { type: 'application/pdf' });
  const blobUrl = window.URL.createObjectURL(blob);
  a.href = blobUrl;
  a.download = candidate[0][0].First_name + "_" + candidate[0][0].Last_name + ".pdf";
  a.click();
  window.URL.revokeObjectURL(blobUrl);
  // const newTab = window.open();
  // newTab.location.href = blobUrl;
};
  

  return (
    <>
      <Navbar userType="recruiter" user_id={user_id}/>
      {candidate && candidate.length > 0 && (
      <>
      <Heading title = "Candidate Profile"/>
      <div className="candpro">
        <div className="candpro_container">
          <div className="left">
            <div className="left_column">
              <div className="leftbox">
                <div className="candidate_dp_div">
                  <img
                    className="candidate_dp"
                    src="https://i.redd.it/spe9d5vah8h81.jpg"
                  />
                </div>
                <div className="cand_name">{candidate[0][0].First_name} {candidate[0][0].Last_name}</div>               
                <div className="cand_element_box">
                  <div className="cand_element_box_left">
                    <div className="cand_line_left">
                    <div className="cand_image"><img src="/email.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">EMAIL</span>
                        <br />
                        <div className="cand_data">{candidate[0][0].email}</div>
                      </div>
                    </div>
                    <div className="cand_line_left">
                      <div className="cand_image"><img src="/linkedin.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">LINKEDIN PROFILE</span>
                        <br />
                        <div className="cand_data"><a href={"https://www." + candidate[0][0].Linkedin}>{candidate[0][0].Linkedin}</a></div>
                      </div>
                    </div>
                    <div className="cand_line_left">
                        <div className="cand_image"><img src="/nationality.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">NATIONALITY</span>
                        <br />
                        <div className="cand_data">
                          {candidate[0][0].Nationality}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cand_element_box_right">
                    <div className="cand_line_right">
                      <div className="cand_image"><img src="/phno.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">PHONE NUMBER</span>
                        <br />
                        <div className="cand_data">{candidate[0][0].Phone}</div>
                      </div>
                    </div>
                    <div className="cand_line_right">
                      <div className="cand_image"><img src="/gender.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">GENDER</span>
                        <br />
                        <div className="cand_data">{candidate[0][0].Gender}</div>
                      </div>
                    </div>
                    <div className="cand_line_right">
                      <div className="cand_image"><img src="/dob.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">DOB</span>
                        <br />
                        <div className="cand_data">{candidate[0][0].Date_of_Birth}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cand_address">
                  <br />
                  <div className="cand_image"><img src="/address.png"></img></div>
                  <div className="cand_address_box">
                    <span className="cand_label">ADDRESS</span>
                    <div className="cand_data">{candidate[0][0].Address}</div>
                  </div>
                </div>
                <div className="cand_skills_box">
                  <div className="cand_label">SKILLS :</div>
                  <div className="cand_skills">
                    {candidate[0][0].Skills.split(",").map((skills, index) => (
                        <div key={index} className="cand_skill">
                            {skills}
                        </div>
                    ))}
                  </div>
                  
                </div>
                <div className="cand_skills_box">
                  <div className="cand_label">LANGUAGES :</div>
                  <div className="cand_skills">
                    {candidate[0][0].Languages.split(",").map((languages, index) => (
                        <div key={index} className="cand_skill">
                            {languages}
                        </div>
                    ))}
                  </div>
                </div>
                <div className="cand_education">
                  <div className="cand_label">EDUCATION</div> 
                  <div className="cand_education_box">
                    {
                      candidate[1].map((edu, index)=>(
                        <div key={index} className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{edu.Degree} - {edu.Major},</div>
                            <div className="exp_duration">{edu.start_year}-{edu.end_year}</div>
                          </div>
                          <div className="cand_line1">
                            <div className="exp_title">{edu.Institution}</div>
                            <div className="exp_duration">Grade : {edu.score}/{edu.max_score}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              <div className="rightbox">
                <div className="cand_exp">
                  <div className="cand_label">EXPERIENCE</div>
                  <div className="cand_exp_box">
                    {
                      candidate[2].map((exp, index)=>(
                        <div key = {index} className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{exp.job_Title}</div>
                            <div className="exp_duration">{exp.start_year}-{exp.end_year}</div>
                          </div>
                          <div className="exp_org_name">{exp.org_name}</div>
                          {/* <div className="cand_desc">
                            {exp.desc}
                          </div> */}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="cand_projects">
                  <div className="cand_label">PROJECTS</div> 
                  <div className="cand_project_box">
                    {
                      candidate[3].map((project, index)=>(
                        <div key = {index} className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{project.Project_Title}</div>
                            <div className="exp_duration">{project.start_date} to {project.end_date}</div>
                          </div>
                          <div className="cand_desc">
                          {project.Project_Desc}
                          </div>
                        </div>
                      ))
                    }
                  </div>  
                </div>
                <div className="cand_resume">
                  <div className="cand_label">RESUME</div>
                  <div className="cand_resume_box">
                    <div>RESUME.pdf</div>
                    <button className="cand_download" onClick={handleDownload}>
                      Download
                    </button>
                  </div>
                </div>
                <div className="cand_disability">
                  <div className="cand_label">DISABILITY</div>
                  <div className="cand_disability_box">{candidate[0][0].Disability}</div>
                </div>
                

                                
              </div>
            </div>
            <Button application={application} fetchApp={fetchApp} app_id={app_id} />
          </div>
          <div className="cand_right">
            {upcoming && <UpcomingCard event={upcoming} />}
          </div>
        </div>
      </div>
      </>)}
    </>
  );
}

// var upcoming = [
//   {
//     title: "Job Title",
//     name: "Candidate Name",
//     id: "#CandidateID",
//     date: "dd/mm/yyyy",
//     time: "hh:mm",
//   },
//   {
//     title: "Job Title",
//     name: "Candidate Name",
//     id: "#CandidateID",
//     date: "dd/mm/yyyy",
//     time: "hh:mm",
//   },
//   {
//     title: "Job Title",
//     name: "Candidate Name",
//     id: "#CandidateID",
//     date: "dd/mm/yyyy",
//     time: "hh:mm",
//   },
// ];

// var candidate = {
//   name: "Malaika Arora",
//   email: "malaika.ar@gmail.com",
//   ph_no: "+11 5423-6548",
//   linkedin: "https://www.linkedin.com/in/gigiljames/",
//   nationality: "Indian",
//   gender: "female",
//   dob: "23/05/1995",
//   address: "NITC, Kattangal, Calicut, Kerala, India",
//   skills: ["Javascript", "Ajax", "SQL","React",],
//   languages: ["English", "Malayalam"],
//   experience: [
//     {
//       title: "UX Designer",
//       org_name: "AirBnb",
//       desc: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.",
//       start_year:"2022",
//       end_date:"2023",
//     },
//     {
//       title: "Swimmer",
//       org_name:"WaterBnb",
//       desc: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.",
//       start_year:"2021",
//       end_date:"2022",
//     },
//   ],
//   disability: "NA",
//   status: "pending",
//   resume: "resume.pdf",
//   project:[
//     {
//       title:"JobArena",
//       desc:"Indeed.com ctrl+c ctrl+v",
//       start_date:"19/10/2023",
//       end_date:"29/10/2023",
//     },
//     {
//       title:"HostelDesk",
//       desc:"Better NITC Hostels App but is a website",
//       start_date:"19/10/2022",
//       end_date:"29/10/2022",
//     },
//   ],
//   education:[
//     {
//       degree:"BTech",
//       major:"Computer Science and Engineering",
//       institution:"NITC",
//       start_year:"2020",
//       end_year:"2024",
//       score:"6.9",
//       max_score:"10",
//     },
//     {
//       degree:"XII",
//       major:"Informatics Practices",
//       institution:"Cochin Refineries School, Thiruvaniyoor",
//       start_year:"2019",
//       end_year:"2020",
//       score:"95",
//       max_score:"100",
//     }
//   ]
//   // status:"shortlisted"
// };

export default CandidateProfle;

// {candidate.skills.map((skills, index) => (
//   <div key={index} className="cand_skill">
//       {Object.entries(skills).map(([key, value]) => (
//           <p key={key}>
//               <strong>{key}:</strong> {value}
//           </p>
//       ))}
//   </div>
// ))}