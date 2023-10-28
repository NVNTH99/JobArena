import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CandidateTab(props){
    const handleTabClick = () =>{
        props.setActiveTab(props.tabName);
    }
    return(
        <>
            <button onClick={handleTabClick} className={"candidate-tab-button " + props.tabName}>
                <div>
                <p>
                    <FontAwesomeIcon size = "lg" icon = {props.icon} style={{marginRight: '15px'}}/>
                    {props.tabName}
                </p>
                <p className="candidate-tab-count">{props.cardCount}</p>
                </div>
            </button>
        </>
    )
}

export default CandidateTab