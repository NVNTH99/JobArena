import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./cand_profile.css"
import { useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'

const initialForm = {
    firstname: '',
    lastname: '',
    linkedin: '',
    dob: '',
    phonenumber: '',
    nationality: '',
    gender: 'male',
    disability: '',
    address: '',
    skills: '',
    resume: null,
    "languages": [],
    "domain": [],
    "workExperience": [{ job_Title: "", org_name: "", start_year: "", end_year: "" }],
    "projects": [{Project_Title: "", Project_Desc: "", start_date: "", end_year: ""}],
};


function formReducer(candidateDetails, action) {
    switch (action.type) {
        case 'InputChange':
            return {
                ...candidateDetails,
                [action.fieldName]: action.value
            };
        case 'CommaInput':
            return {
                ...candidateDetails,
                [languages]: action.value.split(",")
            }
        case 'FileInput':
            console.log(action.file)
            return {
                ...candidateDetails,
                resume: action.file
            }
        case 'changed_arrayField':
            return {
                ...candidateDetails,
                draft: action.nextDraft,
                [action.arrayName]: candidateDetails[action.arrayName]
            }
        case 'added_arrayItem':
            return {
                ...candidateDetails,
                draft: '',
                [action.arrayName]: [
                    candidateDetails.draft,
                    ...candidateDetails[action.arrayName]
                ],
            }
        case 'deleted_arrayField':
            if(candidateDetails[action.arrayName].length === 1 && action.arrayName != "languages" && action.arrayName != "domain")
                return{
                    ...candidateDetails
            }
            return {
                ...candidateDetails,
                [action.arrayName]: candidateDetails[action.arrayName].filter(
                    (item, i) => i !== action.index
                ),
            };
        case 'edit_arrayItem':
            let updatedArray = candidateDetails[action.arrayName].map((item, index) => {
                if (index === action.index) {
                    return {
                        ...item,
                        ...action.currentArray
                    };
                } else {
                    return item;
                }
            });

            return {
                ...candidateDetails,
                [action.arrayName]: updatedArray,
            };
        case 'added_array':
            return {
                ...candidateDetails,
                [action.arrayName]: [
                    ...candidateDetails[action.arrayName],
                    action.addedArray
                ]
            }
        default: return candidateDetails;
    }
}

function Cand_profile() {
    const [candidateDetails, dispatch] = useReducer(formReducer, initialForm);

    function handleSaveButton(e) {
        e.preventDefault();
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        dispatch({
            type: 'InputChange',
            fieldName: name,
            value
        })
    }

    function handleResumeChange(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = function () {
                    const resumeBlob = new Blob([reader.result], { type: file.type });
                    dispatch({ type: 'FileInput', file: resumeBlob });
                };
                reader.readAsArrayBuffer(file);
            } else {
                console.error("Not a pdf file.")
            }
        }
    }
    
    useEffect(() => {
        console.log('Form Data: ', candidateDetails);
    }, [candidateDetails])
    return (
        <>
            <Navbar userType="candidate" />
            <Heading title="Candidate Profile" />
            <div className="candidate-profile-page">
                <div className="alllllcp">
                    <div className="lhscp">
                        <form id="addcp" onSubmit={handleSaveButton}>
                            <div className="cpbg">
                                <PettiCp
                                    left={<CpField labelName="First Name" label="firstname" onChange={handleInputChange} type="text" />}
                                    right={<CpField labelName="Last Name" label="lastname" onChange={handleInputChange} type="text" />}
                                />
                                <PettiCp
                                    left={<CpField labelName="LinkedIn Profile" label="linkedin" onChange={handleInputChange} type="text" />}
                                    right={<CpField labelName="dob" label="dob" onChange={handleInputChange} type="date" />}
                                />
                                <PettiCp
                                    left={<CpField labelName="Phone Number" label="phonenumber" onChange={handleInputChange} type="number" />}
                                    right={<CpField labelName="nationality" label="nationality" onChange={handleInputChange} type="text" />}
                                />
                                <div className="petticp">
                                    <div className="cp__field">
                                        <label htmlFor="gender" className="lblcp">Gender</label>
                                        <select name="gender" value={candidateDetails.gender} onChange={handleInputChange} id="gender" className="dropdowncp">
                                            <option defaultValue="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <CpField labelName="Disability" label="disability" onChange={handleInputChange} type="text" />
                                </div>
                                <PettiCp
                                    left={<CpField labelName="Address" label="address" onChange={handleInputChange} type="text" />}
                                    right={<CpField labelName="Skills" label="skills" onChange={handleInputChange} type="text" />}
                                />
                                <PettiCp
                                    left={<CpField labelName="Resume" label="resume" onChange={handleResumeChange} type="file" />}
                                    right={<div className="cp__field"></div>}
                                />
                                <div className="petticp">
                                    <div className="cp__field">
                                        <label htmlFor="languages" className="lblcp">Languages</label>
                                        <div className="catgrpcp">
                                            <input name="languages" className="cp__input" onChange={e => {
                                                dispatch({ type: 'changed_arrayField', arrayName: "languages", nextDraft: e.target.value })
                                            }} type="text" id="languages" />
                                            <button className="add_button" type="button" onClick={e => {
                                                dispatch({ type: 'added_arrayItem', arrayName: "languages" });
                                            }} id="langpluscp">ADD <FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                        <div id="lang-listcp">
                                            {
                                                candidateDetails["languages"].map((language, index) => (
                                                    <div key={index} className="itemcp">
                                                        {language}
                                                        <button type="button" className="delbtncp" onClick={() =>
                                                            dispatch({ type: 'deleted_arrayField', arrayName: "languages", index })}>X</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="cp__field">
                                        <label htmlFor="domain" className="lblcp">Interested Domain</label>
                                        <div className="catgrpcp">
                                            <input name="domain" type="text" id="domain" className="cp__input" onChange={(e) => {
                                                dispatch({ type: 'changed_arrayField', arrayName: "domain", nextDraft: e.target.value })
                                            }} />
                                            <button className="add_button" type="button" id="domainpluscp" onClick={e => {
                                                dispatch({ type: 'added_arrayItem', arrayName: "domain" });
                                            }}>ADD <FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                        <div id="domain-listcp">
                                            {
                                                candidateDetails["domain"].map((domain, index) => (
                                                    <div key={index} className="itemcp">
                                                        {domain}
                                                        <button type="button" className="delbtncp" onClick={() =>
                                                            dispatch({ type: 'deleted_arrayField', arrayName: "domain", index })}>X</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    candidateDetails["workExperience"].map((we, index) => (
                                        <WorkExperienceForm
                                            key={index}
                                            index={index}
                                            dispatch={dispatch}
                                        />
                                    ))
                                }
                                {
                                    candidateDetails["projects"].map((p, index) => (
                                        <Projects
                                            key={index}
                                            index={index}
                                            dispatch={dispatch}
                                        />
                                    ))
                                }
                                <div id="formsavebtncp">
                                    <button type="submit" onSubmit={handleSaveButton} className="savebtn" >
                                        <p>Save</p>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ScreenBackground />
                    </div>

                </div>
            </div>
        </>
    );
}

function WorkExperienceForm(props) {
    let initialWorkExperience = { job_Title: "", org_name: "", start_year: "", end_year: "" };
    let currentWorkExperience = { job_Title: "", org_name: "", start_year: "", end_year: "" };
    function handleInputChange(e) {
        const { name, value } = e.target;
        currentWorkExperience = { ...props.currentWorkExperience, [name]: value };
        props.dispatch({ type: "edit_arrayItem", arrayName: "workExperience", index: props.index, currentArray: currentWorkExperience })
    }
    return (
        <div className="xtra-formcp">
            <h2 className="xtra-headingcp">Work Experience</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container">
                <div className="petticp">
                    <div className="cp__field">
                        <label className="lblcp">Job Title</label>
                        <input name="job_Title" onChange={handleInputChange} type="text" className="cp__input" />
                    </div>
                    <div className="cp__field">
                        <label className="lblcp">Organisation Name</label>
                        <input name="org_name" onChange={handleInputChange} type="text" className="cp__input"  />
                    </div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label className="lblcp">Start Year</label>
                        <input name="start_year" onChange={handleInputChange} type="number" className="cp__input"/>
                    </div>
                    <div className="cp__field">
                        <label className="lblcp">End Year</label>
                        <input name="end_year" onChange={handleInputChange} type="text" className="cp__input"  />
                    </div>
                </div>
                <div className="petticp-btn">
                    <button type="button" className="delwkcp" value="Delete" onClick={() =>
                        props.dispatch({ type: 'deleted_arrayField', arrayName: "workExperience", index: props.index })}>Delete</button>
                </div>
                <hr className="smhrr" />
            </div>
            <div className="petticp-btn" id="xxx3">
                <button type="button" className="addwkcp" value="addmore" onClick={e => {
                    props.dispatch({ type: "added_array", arrayName: "workExperience", addedArray: initialWorkExperience})
                }}>Add More</button>
            </div>
        </div>
    )
}

function Projects(props) {
    let initialProject = {Project_Title: "", Project_Desc: "", start_date: "", end_year: ""};
    let currentProject = {Project_Title: "", Project_Desc: "", start_date: "", end_year: ""};
    function handleInputChange(e) {
        const { name, value } = e.target;
        currentProject = { ...props.currentProject, [name]: value };
        props.dispatch({ type: "edit_arrayItem", arrayName: "projects", index: props.index, currentArray: currentProject })
    }
    return (
        <div className="xtra-formcp2">
            <h2 className="xtra-headingcp">Projects</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container2">
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="projecttitle" className="lblcp">Project Title</label>
                        <input name="Project_Title" onChange={handleInputChange} type="text" className="cp__input i1" id="projecttitle" />
                    </div>
                    <div className="cp__field"></div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="startyear2" className="lblcp">Start Year</label>
                        <input name="start_year" onChange={handleInputChange} type="number" className="cp__input i1" id="startyear2" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="endyear2" className="lblcp">End Year</label>
                        <input name="end_year" onChange={handleInputChange} type="text" className="cp__input i1" id="endyear2" />
                    </div>
                </div>
                <div className="petticp-btn">
                    <button type="button" className="delwkcp" id="deleteButton1" value="Delete">Delete</button>
                </div>
                <hr className="smhrr" />
            </div>
            <div className="petticp-btn" id="xxx32">
                <button type="button" className="addwkcp" id="addMoreButton2" value="addmore"onClick={e => {
                    props.dispatch({ type: "added_array", arrayName: "projects", addedArray: initialProject})
                }}>Add More</button>
            </div>
        </div>
    )
}

function PettiCp(props) {
    return (
        <div className="petticp">
            {props.left}
            {props.right}
        </div>
    )
}

function CpField(props) {
    return (
        <div className="cp__field">
            <label htmlFor={props.label} className="lblcp">{props.labelName}</label>
            <input name={props.label} onChange={props.onChange} type={props.type} className="cp__input" id={props.label} />
        </div>
    )
}

function ScreenBackground() {
    return (
        <div className="screen__backgroundcp">
            <span className="screen__background__shapecp screen__background__shape4cp"></span>
            <span className="screen__background__shapecp screen__background__shape3cp"></span>
            <span className="screen__background__shapecp screen__background__shape2cp"></span>
            <span className="screen__background__shapecp screen__background__shape1cp"></span>
        </div>
    )
}

export default Cand_profile