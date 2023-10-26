import React from "react";
import Navbar from "../components/Navbar";
import "./RecruiterCandidateProfile.css";
import UpcomingCard from "../components/UpcomingCard";

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
  skills: ["Javascript", "Ajax", "SQL","React","Python","C++","Java","Flutter"],
  languages: ["English", "Malayalam","Hindi","French","sjidfhsdjfhjksdhjksdhfjkhsd"],
  experience: [
    {
      title: "AirBnb",
      desc: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.Conducted extensive user research and usability testing to identify pain points in the search and filtering experience.",
    },
  ],
  disability: "NA",
  status: "pending",
  // status:"shortlisted"
};

function Button(status) {
  var status = status.status;
  if (status === "pending") {
    return (
      <div className="cand_pro_buttons">
        <button className="inviteButton">Invite for interview</button>
        <button className="rejectButton">Reject</button>
      </div>
    );
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
      <Navbar />
      <div className="candpro">
        <h2>Candidate Details</h2>
        <hr />
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
                {candidate.name}
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

                {() => printSkills(candidate.skills)}
                {/* {candidate.languages} */}
              </div>
              <div className="rightbox">
                Experience
                {/* {candidate.experience} */}
                Resume
                Disability
                {candidate.disability}
              </div>
            </div>
            <Button status={candidate.status} />
          </div>
          <div className="right">
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