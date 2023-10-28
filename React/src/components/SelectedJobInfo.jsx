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
                <AppliedButtons ActiveTab = {props.ActiveTab}/>
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

function AppliedButtons(props){
  return(
    <>
      {(props.ActiveTab === "Pending" || props.ActiveTab === "Shortlisted") 
      && <button className="Withdraw applied-jobs-button">Withdraw</button>}
      {props.ActiveTab === "Offered" 
        && 
        <>
          <button className="Accept applied-jobs-button">Accept</button>
          <button className="Reject applied-jobs-button">Reject</button>
        </>
      }
      {
        props.ActiveTab === "Rejected"? <button className="Rejected applied-jobs-button">Rejected</button>:null
      }

      {props.ActiveTab != null ? null:<button className="apply-button">Apply</button>}
    </>
  )
}

export default SelectedJobInfo