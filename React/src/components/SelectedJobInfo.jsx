import React from "react";


function SelectedJobInfo(props){
    return(
        <div className="selected-job-info">

          <div className="selected-job-top">
            <div>
              <div>
                <h1>{props.title}</h1>
                <h3>{props.company}, {props.location}</h3>
                <h3>{props.category}</h3>
              </div>
              <div className="apply-container"> 
                <button className="apply-button">Apply</button>
              </div>
            </div>
            <hr></hr>
          </div>

          <div className="selected-job-bottom">
            <h2>Job Description:</h2>
          </div>

        </div>
    )
}

export default SelectedJobInfo