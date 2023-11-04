import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CandidateUpcomingCard from "../components/CandidateUpcomingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./cand_profile.css"
import { useLocation } from "react-router-dom";
import axios from "axios";

const initialForm = {
    First_name: null,
    Last_name: null,
    Linkedin: null,
    Date_of_Birth: null,
    Phone: null,
    Nationality: null,
    Gender: 'male',
    Disability: null,
    Address: null,
    Skills: null,
    Resume: null,
    email: null,
    prof_pic: null,
    "Languages": [],
    "preference_category": [],
    "workExperience": [{ job_Title: "", org_name: "", start_year: "", end_year: "" }],
    "projects": [{ Project_Title: "", Project_Desc: "", start_date: "", end_year: "" }],
    "education": [{ Degree: "", Major: "", Institution: "", start_year: "", end_year: "", score: 0.0, max_score: 0.0 }]
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
                Resume: action.file
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
                    ...candidateDetails[action.arrayName],
                ],
            }
        case 'deleted_arrayField':
            if (candidateDetails[action.arrayName].length === 1 && action.arrayName != "Languages" && action.arrayName != "preference_category")
                return {
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
        case 'preload_candidateDetails':
            return {
                ...candidateDetails,
                ...action.preLoadedDetails,
                ["Languages"]: action.preLoadedDetails.Languages.split(","),
                ["preference_category"]: action.preLoadedDetails.preference_category.split(",")
            }
        case 'preloaded_array':
            // console.log("dispatched:", action.preLoadedArray);
            return {
                ...candidateDetails,
                [action.arrayName]: action.preLoadedArray
            }
        default: return candidateDetails;
    }
}

function Cand_profile() {
    const location = useLocation()
    const user_id = location.state
    const [candidateDetails, dispatch] = useReducer(formReducer, initialForm);
    const [preLoadedDetails, setPreLoadedDetails] = useState(null);
    const [preloadedWE, setPreLoadedWE] = useState(null);
    const [preloadedEdu, setPreloadedEdu] = useState(null);
    const [preloadedProjects, setPreloadedProjects] = useState(null);

    useEffect(() => {
        async function fetchCandidateDetails() {
            try {
                const response = await axios.get('http://localhost:3000/candidate/details', {
                    params: { cand_id: user_id }
                });
                setPreLoadedDetails(response.data);

            } catch (error) {
                console.log('error fetching candidate details');
            }
        }

        async function fetchWorkExperience() {
            try {
                const response = await axios.get('http://localhost:3000/candidate/work_exp', {
                    params: { cand_id: user_id }
                });
                setPreLoadedWE(response.data)
            } catch (error) {
                console.log('error fetching Work Experience')
            }
        }

        async function fetchEducation() {
            try {
                const response = await axios.get('http://localhost:3000/candidate/education', {
                    params: { cand_id: user_id }
                });
                setPreloadedEdu(response.data)
            } catch (error) {
                console.log('error fetching Work Experience')
            }
        }

        async function fetchProjects() {
            try {
                const response = await axios.get('http://localhost:3000/candidate/projects', {
                    params: { cand_id: user_id }
                });
                setPreloadedProjects(response.data);
            } catch (error) {
                console.log('error fetching Work Experience')
            }
        }

        fetchCandidateDetails();
        fetchEducation();
        fetchWorkExperience();
        fetchProjects();
    }, []);


    useEffect(() => {
        if (preLoadedDetails != null && preloadedEdu != null && preloadedProjects != null && preloadedWE != null) {
            dispatch({ type: "preload_candidateDetails", preLoadedDetails: preLoadedDetails });
            dispatch({ type: 'preloaded_array', arrayName: "education", preLoadedArray: preloadedEdu });
            dispatch({ type: 'preloaded_array', arrayName: "workExperience", preLoadedArray: preloadedWE});
            dispatch({ type: 'preloaded_array', arrayName: "projects", preLoadedArray: preloadedProjects});
        }

    }, [preLoadedDetails, preloadedEdu, preloadedProjects, preloadedWE])


    function handleSaveButton(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/candidate/profile', { candidateDetails: candidateDetails })
            .then(response => {
                if (typeof response.data === 'object') {
                    console.log(0)
                }
                else {
                    seterror('Error in saving candidate profile');
                }
            })
            .catch(error => {
                console.log(error);
            })
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
            <Navbar userType="candidate" user_id={user_id} />
            <Heading title="Candidate Profile" />
            <div className="candidate-profile-page">
                <div className="alllllcp">
                    <div className="lhscp">
                        <form id="addcp" onSubmit={handleSaveButton}>
                            <div className="cpbg">
                                <PettiCp
                                    left={<CpField value={candidateDetails.First_name} labelName="First Name" label="First_name" onChange={handleInputChange} type="text" />}
                                    right={<CpField value={candidateDetails.Last_name} labelName="Last Name" label="Last_name" onChange={handleInputChange} type="text" />}
                                />
                                <PettiCp
                                    left={<CpField value={candidateDetails.Linkedin} labelName="LinkedIn Profile" label="Linkedin" onChange={handleInputChange} type="text" />}
                                    right={<CpField value={candidateDetails.Date_of_Birth} labelName="Date Of Birth" label="Date_of_Birth" onChange={handleInputChange} type="date" />}
                                />
                                <PettiCp
                                    left={<CpField value={candidateDetails.Phone} labelName="Phone Number" label="Phone" onChange={handleInputChange} type="number" />}
                                    right={<CpField value={candidateDetails.Nationality} labelName="Nationality" label="Nationality" onChange={handleInputChange} type="text" />}
                                />
                                <div className="petticp">
                                    <div className="cp__field">
                                        <label htmlFor="Gender" className="lblcp">Gender</label>
                                        <select name="Gender" value={candidateDetails.Gender} onChange={handleInputChange} id="Gender" className="dropdowncp">
                                            <option defaultValue={candidateDetails.Gender}>Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <CpField value={candidateDetails.Disability} labelName="Disability" label="Disability" onChange={handleInputChange} type="text" />
                                </div>
                                <PettiCp
                                    left={<CpField value={candidateDetails.Address} labelName="Address" label="Address" onChange={handleInputChange} type="text" />}
                                    right={<CpField value={candidateDetails.Skills} labelName="Skills" label="Skills" onChange={handleInputChange} type="text" />}
                                />
                                <PettiCp
                                    left={<CpField value={candidateDetails.Resume} labelName="Resume" label="Resume" onChange={handleResumeChange} type="file" />}
                                    right={<CpField value={candidateDetails.email} labelName="Email" label="email" onChange={handleInputChange} type="email" />}
                                />
                                <div className="petticp">
                                    <div className="cp__field">
                                        <label htmlFor="Languages" className="lblcp">Languages</label>
                                        <div className="catgrpcp">
                                            <input name="Languages" className="cp__input" onChange={e => {
                                                dispatch({ type: 'changed_arrayField', arrayName: "Languages", nextDraft: e.target.value })
                                            }} type="text" id="Languages" />
                                            <button className="add_button" type="button" onClick={e => {
                                                dispatch({ type: 'added_arrayItem', arrayName: "Languages" });
                                            }} id="langpluscp">ADD <FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                        <div id="lang-listcp">
                                            {
                                                candidateDetails["Languages"] && candidateDetails["Languages"].map((language, index) => (
                                                    <div key={index} className="itemcp">
                                                        {language}
                                                        <button type="button" className="delbtncp" onClick={() =>
                                                            dispatch({ type: 'deleted_arrayField', arrayName: "Languages", index })}>X</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="cp__field">
                                        <label htmlFor="preference_category" className="lblcp">Interested Domain</label>
                                        <div className="catgrpcp">
                                            <input name="preference_category" type="text" id="preference_category" className="cp__input" onChange={(e) => {
                                                dispatch({ type: 'changed_arrayField', arrayName: "preference_category", nextDraft: e.target.value })
                                            }} />
                                            <button className="add_button" type="button" id="domainpluscp" onClick={e => {
                                                dispatch({ type: 'added_arrayItem', arrayName: "preference_category" });
                                            }}>ADD <FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                        <div id="domain-listcp">
                                            {
                                                candidateDetails["preference_category"].map((domain, index) => (
                                                    <div key={index} className="itemcp">
                                                        {domain}
                                                        <button type="button" className="delbtncp" onClick={() =>
                                                            dispatch({ type: 'deleted_arrayField', arrayName: "preference_category", index })}>X</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    candidateDetails["education"].map((ed, index) => {
                                        return (
                                            <Education
                                                key={index}
                                                index={index}
                                                dispatch={dispatch}
                                                ed={ed}
                                            />
                                        )
                                    })
                                }

                                {
                                    candidateDetails["workExperience"].map((we, index) => {
                                        return (
                                            <WorkExperienceForm
                                                key={index}
                                                index={index}
                                                dispatch={dispatch}
                                                we={we}
                                            />
                                        )
                                    })
                                }
                                {
                                    candidateDetails["projects"].map((p, index) => (
                                        <Projects
                                            key={index}
                                            index={index}
                                            dispatch={dispatch}
                                            p = {p}
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

function Education(props) {
    let initialEducation = { Degree: "", Major: "", Institution: "", start_year: "", end_year: "", score: 0.0, max_score: 0.0 };
    // console.log("In education: ", props.index, props.ed)

    function handleInputChange(e) {
        const { name, value } = e.target;
        const updatedEd = {
            ...props.ed,
            [name]: value
        };

        props.dispatch({
            type: "edit_arrayItem",
            arrayName: "education",
            index: props.index,
            currentArray: updatedEd
        });
    }
    
    return (
        <>
            <div className="xtra-formcp">
                <h2 className="xtra-headingcp">Education</h2>
                <hr className="hrrcp" />
                <div className="xtra-form-container">
                    <div className="petticp">
                        <div className="cp__field">
                            <label className="lblcp">Institution</label>
                            <input value={props.ed.Institution} name="Institution" type="text" className="cp__input" onChange={handleInputChange} />
                        </div>
                        <div className="cp__field">
                            <label className="lblcp">Degree</label>
                            <input value={props.ed.Degree} name="Degree" type="text" className="cp__input" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="petticp">
                        <div className="cp__field">
                            <label className="lblcp">Major</label>
                            <input value={props.ed.Major} name="Major" type="text" className="cp__input" onChange={handleInputChange} />
                        </div>
                        <div className="cp__field"></div>
                    </div>
                    <div className="petticp">
                        <div className="cp__field">
                            <label className="lblcp">Start Year</label>
                            <input value={props.ed.start_year} name="start_year" type="number" className="cp__input" onChange={handleInputChange} />
                        </div>
                        <div className="cp__field">
                            <label className="lblcp">End Year</label>
                            <input value={props.ed.end_year} name="end_year" type="number" className="cp__input" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="petticp">
                        <div className="cp__field">
                            <label className="lblcp">Score</label>
                            <input value={props.ed.score} name="score" min="0.00" step="0.01" type="number" className="cp__input" onChange={handleInputChange} />
                        </div>
                        <div className="cp__field">
                            <label className="lblcp">Max Score</label>
                            <input value={props.ed.max_score} name="max_score" min="0.00" step="0.01" type="number" className="cp__input" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="petticp-btn">
                        <button type="button" className="delwkcp" value="Delete" onClick={() =>
                            props.dispatch({ type: 'deleted_arrayField', arrayName: "education", index: props.index })}>Delete</button>
                    </div>
                    <hr className="smhrr" />
                </div>
                <div className="petticp-btn" id="xxx3">
                    <button type="button" className="addwkcp" value="addmore" onClick={e => {
                        props.dispatch({ type: "added_array", arrayName: "education", addedArray: initialEducation })
                    }}>Add More</button>
                </div>
            </div>
        </>
    )
}

function WorkExperienceForm(props) {
    let initialWorkExperience = { job_Title: "", org_name: "", start_year: "", end_year: "" };

    function handleInputChange(e) {
        const { name, value } = e.target;
        const updatedWorkExperience = {
            ...props.we,
            [name]: value
        };
        props.dispatch({
            type: "edit_arrayItem",
            arrayName: "workExperience",
            index: props.index,
            currentArray: updatedWorkExperience
        });
    }

    return (
        <div className="xtra-formcp">
            <h2 className="xtra-headingcp">Work Experience</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container">
                <div className="petticp">
                    <div className="cp__field">
                        <label className="lblcp">Job Title</label>
                        <input value={props.we.job_Title} name="job_Title" onChange={handleInputChange} type="text" className="cp__input" />
                    </div>
                    <div className="cp__field">
                        <label className="lblcp">Organisation Name</label>
                        <input value={props.we.org_name} name="org_name" onChange={handleInputChange} type="text" className="cp__input" />
                    </div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label className="lblcp">Start Year</label>
                        <input value={props.we.start_year} name="start_year" onChange={handleInputChange} type="number" className="cp__input" />
                    </div>
                    <div className="cp__field">
                        <label className="lblcp">End Year</label>
                        <input value={props.we.end_year} name="end_year" onChange={handleInputChange} type="number" className="cp__input" />
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
                    props.dispatch({ type: "added_array", arrayName: "workExperience", addedArray: initialWorkExperience })
                }}>Add More</button>
            </div>
        </div>
    )
}

function Projects(props) {
    let initialProject = { Project_Title: "", Project_Desc: "", start_date: "", end_year: "" };

    function handleInputChange(e) {
        const { name, value } = e.target;
        const updatedProject = {
            ...props.p,
            [name]: value
        };
        setCurrentProject(updatedProject);
        props.dispatch({
            type: "edit_arrayItem",
            arrayName: "projects",
            index: props.index,
            currentArray: updatedProject
        });
    }
    return (
        <div className="xtra-formcp2">
            <h2 className="xtra-headingcp">Projects</h2>
            <hr className="hrrcp" />
            <div className="xtra-form-container2">
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="projecttitle" className="lblcp">Project Title</label>
                        <input value={props.p.Project_Title} name="Project_Title" onChange={handleInputChange} type="text" className="cp__input i1" id="projecttitle" />
                    </div>
                    <div className="cp__field"></div>
                </div>
                <div className="petticp">
                    <div className="cp__field">
                        <label htmlFor="startyear2" className="lblcp">Start Date</label>
                        <input value={props.p.start_date} name="start_date" onChange={handleInputChange} type="date" className="cp__input i1" id="startyear2" />
                    </div>
                    <div className="cp__field">
                        <label htmlFor="endyear2" className="lblcp">End Date</label>
                        <input value={props.p.end_date} name="end_date" onChange={handleInputChange} type="date" className="cp__input i1" id="endyear2" />
                    </div>
                </div>
                <div className="petticp-btn">
                    <button type="button" className="delwkcp" id="deleteButton1" value="Delete" onClick={() =>
                        props.dispatch({ type: 'deleted_arrayField', arrayName: "projects", index: props.index })}>Delete</button>
                </div>
                <hr className="smhrr" />
            </div>
            <div className="petticp-btn" id="xxx32">
                <button type="button" className="addwkcp" id="addMoreButton2" value="addmore" onClick={e => {
                    props.dispatch({ type: "added_array", arrayName: "projects", addedArray: initialProject })
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
    if (props.label === "Resume")
        return (
            <div className="cp__field">
                <label htmlFor={props.label} className={"lblcp " + props.label}>{props.labelName}</label>
                <input name={props.label} onChange={props.onChange} type={props.type} className="cp__input" id={props.label} />

            </div>
        )
    return (
        <div className="cp__field">
            <label htmlFor={props.label} className={"lblcp " + props.label}>{props.labelName}</label>
            {props.value === null ?
                <input name={props.label} onChange={props.onChange} type={props.type} className="cp__input" id={props.label} />
                :
                <input value={props.value} name={props.label} onChange={props.onChange} type={props.type} className="cp__input " id={props.label} />}
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