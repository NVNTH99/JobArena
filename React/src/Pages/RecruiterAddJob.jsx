import React, { useEffect, useReducer } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import UpcomingCard from "../components/UpcomingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./RecruiterAddJob.css";

var upcoming = [
    { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
    { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
    { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
]
var events = { "upcoming": upcoming };

function RecruiterLoad() {
    const domain_inputField = document.getElementById("domainfieldaj");
    const domain_addButton = document.getElementById("domainplusaj");
    const domain_itemList = document.getElementById("domain-listaj");

    domain_addButton.addEventListener("click", function () {
        const domain_inputValue = domain_inputField.value.trim();

        if (domain_inputValue !== "") {
            const domain_newItem = document.createElement("div");
            domain_newItem.classList.add("itemaj");
            domain_newItem.innerHTML = `
                        ${domain_inputValue}
                        <button type="button" class="delbtncp">X</button>
                    `;
            domain_itemList.appendChild(domain_newItem);
            domain_inputField.value = "";
        }
    });

    domain_itemList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delbtncp")) {
            event.target.parentNode.remove();
        }
    });

    const buttons = document.querySelectorAll(".buttongaj");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            buttons.forEach((b) => b.classList.remove("activeaj"));
            button.classList.add("activeaj");
        });
    });

}

const initialJobForm = {
    title: "",
    Description: "",
    org_name: "",
    Responsibility: "",
    Requirements: "",
    Deadline: "",
    Location: "",
    salary: "",
    work_days: "",
    work_hours: "",
    job_type: "",
    "category": ""
}

function recruiterFormReducer(jobDetails, action) {
    switch (action.type) {
        case 'InputChange':
            return {
                ...candidateDetails,
                [action.fieldName]: action.value
            };
        case 'CommaInput':
            return {
                ...candidateDetails,
                [action.fieldName]: action.value.split(",")
            }
    }
}

function RecruiterAddJob() {
    // useEffect(() => {
    //     RecruiterLoad();
    // }, []);

    const [jobDetails, dispatch] = useReducer(recruiterFormReducer, initialJobForm);

    return (
        <>
            <Navbar userType="recruiter" />
            <Heading title="Add Job" />
            <div className="add-job-body">
                <div className="add-job-aditya">
                    <div className="alllll">
                        <section className="lhs">
                            <form id="addjf">
                                <div className="addjobbg">
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="jobtitle" className="lbl">Job Title</label>
                                            <input type="text" className="aj__input" id="jobtitle" aria-describedby="jobtitle"></input>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="companyname" className="lbl">Company Name</label>
                                            <input type="text" className="aj__input" id="companyname" placeholder="Company Name" disabled></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="JobDescription" className="lbl">Job Description</label>
                                            <textarea className="aj__input" id="JobDescription" rows="8"></textarea>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="domain" className="lbl">Required Domain</label>
                                            <div className="catgrpaj">
                                                <input type="text" id="domainfieldaj" className="aj__input"
                                                    aria-describedby="domain"></input>
                                                <button type="button" id="domainplusaj">ADD&nbsp;<FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                            <div id="domain-listaj"></div>
                                        </div>

                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="location" className="lbl">Location</label>
                                            <input type="text" className="aj__input" id="location"></input>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="salary" className="lbl">Salary per annum</label>
                                            <input type="number" className="aj__input" id="salary"></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="workdays" className="lbl">Work Days</label>
                                            <input type="text" className="aj__input" id="workdays" aria-describedby="workdays"></input>

                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="salary" className="lbl">Work Hours</label>
                                            <input type="text" className="aj__input" id="salary" placeholder="[Start Time] - [End Time]"></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="responsibility" className="lbl">Responsibility</label>
                                            <textarea className="aj__input" id="responsibility" rows="5"></textarea>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="requirements" className="lbl">Requirements</label>
                                            <textarea className="aj__input" id="requirements" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="disability" className="lbl">Job Type</label>
                                            <div className="button-container-aj">
                                                <button type="button" className="buttongaj" id="onsite">Onsite</button>
                                                <button type="button" className="buttongaj" id="wfh">Work from Home</button>
                                                <button type="button" className="buttongaj" id="hybrid">Hybrid</button>
                                            </div>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="deadline" className="lbl">Deadline</label>
                                            <div className="input-container">
                                                <input type="date" className="aj__input" id="ajdate" name="deadline"></input>
                                                <input type="time" className="aj__input" id="ajtime" name="time"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="formsavebtn">
                                        <a className="savebtn" href="#">
                                            <p>Save</p>
                                        </a>
                                    </div>
                                </div>

                            </form>
                            <ScreenBackground />
                        </section>
                    </div>
                </div>
                <div className="add-job-right">
                    <UpcomingCard event={events.upcoming} />
                </div>
            </div>
        </>
    )
}

function ScreenBackground() {
    return (
        <div className="screen__backgroundaj">
            <span className="screen__background__shapeaj screen__background__shape4aj"></span>
            <span className="screen__background__shapeaj screen__background__shape3aj"></span>
            <span className="screen__background__shapeaj screen__background__shape2aj"></span>
            <span className="screen__background__shapeaj screen__background__shape1aj"></span>
        </div>
    )
}

export default RecruiterAddJob