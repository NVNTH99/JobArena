import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CandidateTab(props){
    return(
        <>
            <button className={"candidate-tab-button " + props.type} style={props.style}>
                <p>
                    <FontAwesomeIcon icon = {props.icon} style={{marginRight: '15px'}}/>
                    {props.tabName}
                </p>
            </button>
        </>
    )
}

export default CandidateTab