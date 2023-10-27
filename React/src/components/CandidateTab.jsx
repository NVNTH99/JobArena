import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CandidateTab(props){
    return(
        <>
            <button className={"candidate-tab-button " + props.type} style={props.style}>
                <div>
                <p>
                    <FontAwesomeIcon size = "lg" icon = {props.icon} style={{marginRight: '15px'}}/>
                    {props.tabName}
                </p>
                <p className="candidate-tab-count">1{props.count}</p>
                </div>

            </button>
        </>
    )
}

export default CandidateTab