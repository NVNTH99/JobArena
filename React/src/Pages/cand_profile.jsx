import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import AdityaLoad from "./AdityaLoad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./cand_profile.css"
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
    "workExperience": [],
    "projects": [],
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
            return{
                ...candidateDetails,
                [resume]: action.file
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
            return {
                ...candidateDetails,
                [action.arrayName]: candidateDetails[action.arrayName].filter(
                    (item, i) => i !== action.index
                ),
            };
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

    function handleWorkExperience(e) {
        const { name, value } = e.target;

    }

    const formFields = [
        { labelName: 'First Name', label: 'firstname', type: 'text' },
        { labelName: 'Last Name', label: 'lastname', type: 'text' },
        { labelName: 'LinkedIn Profile', label: 'linkedin', type: 'text' },
        { labelName: 'Date of Birth', label: 'dob', type: 'date' },
        { labelName: 'Phone Number', label: 'phonenumber', type: 'number' },
        { labelName: 'Nationality', label: 'nationality', type: 'text' },
    ];

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
                                    right={<CpField labelName="dob" label="lastname" onChange={handleInputChange} type="date" />}
                                />
                                <PettiCp
                                    left={<CpField labelName="Phone Number" label="phonenumber" onChange={handleInputChange} type="number" />}
                                    right={<CpField labelName="nationality" label="lastname" onChange={handleInputChange} type="text" />}
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
                                    left={<CpField labelName="Resume" label="resume" onChange={handleInputChange} type="resume" />}
                                    right={<div className="cp__field"></div>}
                                />
                                <div className="petticp">
                                    <div className="cp__field">
                                        <label htmlFor="languages" className="lblcp">Languages</label>
                                        <div className="catgrpcp">
                                            <input name="languages" className="cp__input" onChange={e => {
                                                dispatch({ type: 'changed_arrayField', arrayName: "languages", nextDraft: e.target.value })
                                            }} type="text" id="languages" />
                                            <button type="button" onClick={e => {
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
                                            <button type="button" id="domainpluscp" onClick={e => {
                                                dispatch({ type: 'added_arrayItem', arrayName: "domain  " });
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
                                <WorkExperienceForm />
                                <Projects/>
                                <div id="formsavebtncp">
                                    <button type="submit" className="savebtncp" >
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
    let currentWorkExperience = {jobtitle: "", org_name: "",  startyear: "", endyear: ""};
    function handleInputChange(e){
        const {name, value} = e.target;
        currentWorkExperience = {...currentWorkExperience, [name]:value};
    }
    return (
        <div className="xtra-formcp">
            <h2 className="xtra-headingcp">Work Experience</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container">
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="jobtitle" className="lblcp">Job Title</label>
                        <input name="jobtitle" onChange={handleInputChange} type="text" className="cp__input" id="jobtitle" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="org_name" className="lblcp">Organisation Name</label>
                        <input name="org_name" onChange={handleInputChange} type="text" className="cp__input" id="org_name" />
                    </div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="startyear" className="lblcp">Start Year</label>
                        <input name="workstartyear" onChange={handleInputChange} type="number" className="cp__input" id="startyear" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="endyear" className="lblcp">End Year</label>
                        <input name="workendyear" onChange={handleInputChange} type="text" className="cp__input" id="endyear" />
                    </div>
                </div>
                <div className="petticp-btn">
                    <button type="button" className="delwkcp" id="deleteButton1" value="Delete">Delete</button>
                </div>
                <hr className="smhrr" />
            </div>
            <div className="petticp-btn" id="xxx3">
                <button type="button" className="addwkcp" id="addMoreButton" value="addmore">Add More</button>
            </div>
        </div>
    )
}

function Projects(props) {
    return (
        <div className="xtra-formcp2">
            <h2 className="xtra-headingcp">Projects</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container2">
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="projecttitle" className="lblcp">Project Title</label>
                        <input name="projecttitle" onChange={props.onChange} type="text" className="cp__input i1" id="projecttitle" />
                    </div>
                    <div className="cp__field"></div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="startyear2" className="lblcp">Start Year</label>
                        <input name="projectstartyear" onChange={props.onChange} type="number" className="cp__input i1" id="startyear2" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="endyear2" className="lblcp">End Year</label>
                        <input name="projectendyear" onChange={props.onChange} type="text" className="cp__input i1" id="endyear2" />
                    </div>
                </div>
                <div className="petticp-btn">
                    <button type="button" className="delwkcp" id="deleteButton1" value="Delete">Delete</button>
                </div>
                <hr className="smhrr" />
            </div>
            <div className="petticp-btn" id="xxx32">
                <button type="button" className="addwkcp" id="addMoreButton2" value="addmore">Add More</button>
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