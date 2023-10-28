import React from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import "./RecruiterCandidateProfile.css";
import UpcomingCard from "../components/UpcomingCard";
import InviteRejectButton from "../components/InviteRejectButton";


function Button(status) {
  var status = status.status;
  
  if (status === "pending") { 
    return(
      <div className="cand_pro_buttons">
        <InviteRejectButton/>
      </div>
    )
  } else if (status === "shortlisted") {
    return (
      <div className="cand_pro_buttons">
        <button className="acceptButton">Accept</button>
        <button className="rejectButton">Reject</button>
      </div>
    );
  }
}

function CandidateProfle() {
  
  return (
    <>
      <Navbar userType="recruiter"/>
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
                <div className="cand_name">{candidate.name}</div>               
                <div className="cand_element_box">
                  <div className="cand_element_box_left">
                    <div className="cand_line_left">
                    <div className="cand_image"><img src="/email.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">EMAIL</span>
                        <br />
                        <div className="cand_data">{candidate.email}</div>
                      </div>
                    </div>
                    <div className="cand_line_left">
                      <div className="cand_image"><img src="/linkedin.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">LINKEDIN PROFILE</span>
                        <br />
                        <div className="cand_data"><a href={candidate.linkedin}>{candidate.linkedin}</a></div>
                      </div>
                    </div>
                    <div className="cand_line_left">
                        <div className="cand_image"><img src="/nationality.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">NATIONALITY</span>
                        <br />
                        <div className="cand_data">
                          {candidate.nationality}
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
                        <div className="cand_data">{candidate.ph_no}</div>
                      </div>
                    </div>
                    <div className="cand_line_right">
                      <div className="cand_image"><img src="/gender.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">GENDER</span>
                        <br />
                        <div className="cand_data">{candidate.gender}</div>
                      </div>
                    </div>
                    <div className="cand_line_right">
                      <div className="cand_image"><img src="/dob.png"></img></div>
                      <div className="cand_data_box">
                        <span className="cand_label">DOB</span>
                        <br />
                        <div className="cand_data">{candidate.dob}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cand_address">
                  <br />
                  <div className="cand_image"><img src="/address.png"></img></div>
                  <div className="cand_address_box">
                    <span className="cand_label">ADDRESS</span>
                    <div className="cand_data">{candidate.address}</div>
                  </div>
                </div>
                <div className="cand_skills_box">
                  <div className="cand_label">SKILLS :</div>
                  <div className="cand_skills">
                    {candidate.skills.map((skills, index) => (
                        <div key={index} className="cand_skill">
                            {skills}
                        </div>
                    ))}
                  </div>
                  
                </div>
                <div className="cand_skills_box">
                  <div className="cand_label">LANGUAGES :</div>
                  <div className="cand_skills">
                    {candidate.languages.map((languages, index) => (
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
                      candidate.education.map((edu, index)=>(
                        <div key={index} className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{edu.degree} - {edu.major},</div>
                            <div className="exp_duration">{edu.start_year}-{edu.end_year}</div>
                          </div>
                          <div className="cand_line1">
                            <div className="exp_title">{edu.institution}</div>
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
                      candidate.experience.map((exp, index)=>(
                        <div className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{exp.title}</div>
                            <div className="exp_duration">{exp.start_year}-{exp.end_date}</div>
                          </div>
                          <div className="exp_org_name">{exp.org_name}</div>
                          <div className="cand_desc">
                            {exp.desc}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="cand_projects">
                  <div className="cand_label">PROJECTS</div> 
                  <div className="cand_project_box">
                    {
                      candidate.project.map((project, index)=>(
                        <div className="cand_exp_element">
                          <div className="cand_line1">
                            <div className="exp_title">{project.title}</div>
                            <div className="exp_duration">{project.start_date}-{project.end_date}</div>
                          </div>
                          <div className="cand_desc">
                          {project.desc}
                          </div>
                        </div>
                      ))
                    }
                  </div>  
                </div>
                <div className="cand_resume">
                  <div className="cand_label">RESUME</div>
                  <div className="cand_resume_box">
                      <div>{candidate.resume}</div>
                      <button className="cand_download">Download</button>
                  </div>
                </div>
                <div className="cand_disability">
                  <div className="cand_label">DISABILITY</div>
                  <div className="cand_disability_box">{candidate.disability}</div>
                </div>
                

                                
              </div>
            </div>
            <Button status={candidate.status} />
          </div>
          <div className="cand_right">
            <UpcomingCard event={upcoming} />
          </div>
        </div>
        {/* <a
          target="_blank"
          href="https://icons8.com/icon/yW7lE4dXAhXK/home-address"
        >
          Home Address
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a> */}
      </div>
    </>
  );
}

var upcoming = [
  {
    title: "Job Title",
    name: "Candidate Name",
    id: "#CandidateID",
    date: "dd/mm/yyyy",
    time: "hh:mm",
  },
  {
    title: "Job Title",
    name: "Candidate Name",
    id: "#CandidateID",
    date: "dd/mm/yyyy",
    time: "hh:mm",
  },
  {
    title: "Job Title",
    name: "Candidate Name",
    id: "#CandidateID",
    date: "dd/mm/yyyy",
    time: "hh:mm",
  },
];

var candidate = {
  name: "Malaika Arora",
  email: "malaika.ar@gmail.com",
  ph_no: "+11 5423-6548",
  linkedin: "https://www.linkedin.com/in/gigiljames/",
  nationality: "Indian",
  gender: "female",
  dob: "23/05/1995",
  address: "NITC, Kattangal, Calicut, Kerala, India",
  skills: ["Javascript", "Ajax", "SQL","React",],
  languages: ["English", "Malayalam"],
  experience: [
    {
      title: "UX Designer",
      org_name: "AirBnb",
      desc: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.",
      start_year:"2022",
      end_date:"2023",
    },
    {
      title: "Swimmer",
      org_name:"WaterBnb",
      desc: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.",
      start_year:"2021",
      end_date:"2022",
    },
  ],
  disability: "NA",
  status: "pending",
  resume: "resume.pdf",
  project:[
    {
      title:"JobArena",
      desc:"Indeed.com ctrl+c ctrl+v",
      start_date:"19/10/2023",
      end_date:"29/10/2023",
    },
    {
      title:"HostelDesk",
      desc:"Better NITC Hostels App but is a website",
      start_date:"19/10/2022",
      end_date:"29/10/2022",
    },
  ],
  education:[
    {
      degree:"BTech",
      major:"Computer Science and Engineering",
      institution:"NITC",
      start_year:"2020",
      end_year:"2024",
      score:"6.9",
      max_score:"10",
    },
    {
      degree:"XII",
      major:"Informatics Practices",
      institution:"Cochin Refineries School, Thiruvaniyoor",
      start_year:"2019",
      end_year:"2020",
      score:"95",
      max_score:"100",
    }
  ]
  // status:"shortlisted"
};

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