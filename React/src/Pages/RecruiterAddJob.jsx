import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import UpcomingCard from "../components/UpcomingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./RecruiterAddJob.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// var upcoming = [
//     { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
//     { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
//     { title: "Job Title", name: "Candidate Name", id: "#CandidateID", date: "dd/mm/yyyy", time: "hh:mm" },
// ]
// var events = { "upcoming": upcoming };

function RecruiterLoad() {
    const buttons = document.querySelectorAll(".buttongaj");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            buttons.forEach((b) => b.classList.remove("activeaj"));
            button.classList.add("activeaj");
        });
    });

}

let initialJobForm = {
    title: "",
    Description: "",
    org_name: "",
    Responsibility: "",
    Requirements: "",
    Deadline: "",
    Location: "",
    salary: 0,
    work_days: "",
    work_hours: "",
    job_type: "",
    "category": []
}

function recruiterFormReducer(jobDetails, action) {
    switch (action.type) {
        case 'InputChange':
            return {
                ...jobDetails,
                [action.fieldName]: action.value
            };
        case 'CommaInput':
            return {
                ...jobDetails,
                [languages]: action.value.split(",")
            }
        case 'changed_arrayField':
            return {
                ...jobDetails,
                draft: action.nextDraft,
                [action.arrayName]: jobDetails[action.arrayName]
            }
        case 'added_arrayItem':
            return {
                ...jobDetails,
                draft: '',
                [action.arrayName]: [
                    jobDetails.draft,
                    ...jobDetails[action.arrayName]
                ],
            }
        case 'deleted_arrayField':
            return {
                ...jobDetails,
                [action.arrayName]: jobDetails[action.arrayName].filter(
                    (item, i) => i !== action.index
                ),
            };
        default: return jobDetails;
    }
}

function RecruiterAddJob() {
    const location = useLocation()
    const user_id = location.state
    const [upcoming,setupcoming] = useState([])
    const navigate = useNavigate();

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
    },[])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_ROOT}/recruiter/organization`,{
            params: {
                user_id: user_id
            }
        })
        .then(response => {
            initialJobForm.org_name = response.data
        })
        .catch(error => {
            console.log(error,"Error fetching organization name")
        })
    },[])

    function handleSaveButton(e) {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_ROOT}/recruiter/addjob`,{initialJobForm: jobDetails, user_id: user_id})
        .then(response => {
            navigate("/recruiter/home", { state: user_id })
        })
        .catch(error => {
            console.log(error, "Error adding job")
        })
    }

    function handleInputChange(e) {
        const { id } = e.target;
        if (id === "onsite" || id === "wfh" || id === "hybrid") {
            dispatch({
                type: 'InputChange',
                fieldName: 'job_type',
                value: id,
            });
        } else {
            const { name, value } = e.target;
            dispatch({
                type: 'InputChange',
                fieldName: name,
                value
            });
        }
    }

    function handleDeadline() {
        const dateValue = document.getElementById("ajdate").value;
        const timeValue = document.getElementById("ajtime").value;
        const deadline = dateValue + " " + timeValue;

        dispatch({
            type: 'InputChange',
            fieldName: 'Deadline',
            value: deadline,
        });
    }

    const [jobDetails, dispatch] = useReducer(recruiterFormReducer, initialJobForm);

    useEffect(() => {
        RecruiterLoad();
        console.log("Job Details: ", jobDetails);
    }, [jobDetails])    

    return (
        <>
            <Navbar userType="recruiter" user_id={user_id}/>
            <Heading title="Add Job" />
            <div className="add-job-body">
                <div className="add-job-aditya">
                    <div className="alllll">
                        <section className="lhs">
                            <form id="addjf">
                                <div className="addjobbg">
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label className="lbl">Job Title</label>
                                            <input onChange={handleInputChange} name="title" type="text" className="aj__input" id="jobtitle"></input>
                                        </div>
                                        <div className="aj__field">
                                            <label className="lbl">Company Name</label>
                                            <input onChange={handleInputChange} name="org_name" type="text" className="aj__input" placeholder={initialJobForm.org_name} disabled></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label className="lbl">Job Description</label>
                                            <textarea onChange={handleInputChange} name="Description" className="aj__input" rows="8" ></textarea>
                                        </div>
                                        <div className="aj__field">
                                            <label className="lbl">Required Domain</label>
                                            <div className="catgrpaj">
                                                <input  name="category" type="text" className="aj__input" onChange={e => {
                                                    dispatch({ type: 'changed_arrayField', arrayName: "category", nextDraft: e.target.value })
                                                }}></input>
                                                <button type="button" id="domainplusaj" onClick={e => {
                                                    dispatch({ type: 'added_arrayItem', arrayName: "category" });
                                                }}>ADD&nbsp;<FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                            <div id="domain-listaj">
                                                {
                                                    jobDetails["category"].map((category, index) => (
                                                        <div key = {index} className="itemaj">
                                                            {category}
                                                            <button type="button" className="delbtncp" onClick={() =>
                                                            dispatch({ type: 'deleted_arrayField', arrayName: "category", index })}>X</button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="location" className="lbl">Location</label>
                                            <input name="Location" onChange={handleInputChange} type="text" className="aj__input" id="location"></input>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="salary" className="lbl">Salary per annum</label>
                                            <input name="salary" onChange={handleInputChange} type="number" className="aj__input" id="salary"></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="workdays" className="lbl">Work Days</label>
                                            <input name="work_days" onChange={handleInputChange} type="number" min = "1" max = "7" className="aj__input" id="workdays" aria-describedby="workdays"></input>

                                        </div>
                                        <div className="aj__field">
                                            <label className="lbl">Work Hours</label>
                                            <input name="work_hours" onChange={handleInputChange} type="text" className="aj__input" placeholder="[Start Time] - [End Time]"></input>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="responsibility" className="lbl">Responsibility</label>
                                            <textarea name="Responsibility"onChange={handleInputChange} className="aj__input" id="responsibility" rows="5"></textarea>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="requirements" className="lbl">Requirements</label>
                                            <textarea name="Requirements" onChange={handleInputChange} className="aj__input" id="requirements" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="pettiaj">
                                        <div className="aj__field">
                                            <label htmlFor="disability" className="lbl">Job Type</label>
                                            <div className="button-container-aj">
                                                <button id="onsite" onClick={handleInputChange} type="button" className="buttongaj">Onsite</button>
                                                <button id="wfh" onClick={handleInputChange} type="button" className="buttongaj">Work from Home</button>
                                                <button id="hybrid" onClick={handleInputChange} type="button" className="buttongaj">Hybrid</button>
                                            </div>
                                        </div>
                                        <div className="aj__field">
                                            <label htmlFor="deadline" className="lbl">Deadline</label>
                                            <div className="input-container">
                                                <input onChange={handleDeadline} type="date" className="aj__input" id="ajdate" name="DeadlineDate"></input>
                                                <input onChange={handleDeadline} type="time" className="aj__input" id="ajtime" name="DeadlineTime"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="formsavebtn">
                                        <button type="submit" onClick={handleSaveButton} className="savebtn">
                                            <p>Submit</p>
                                        </button>
                                    </div>
                                </div>

                            </form>
                            <ScreenBackground />
                        </section>
                    </div>
                </div>
                <div className="add-job-right">
                    {upcoming && <UpcomingCard event={upcoming} />}
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