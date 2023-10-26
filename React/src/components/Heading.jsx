import React from "react";

function Heading(props){
    return(
        <div className="standard-heading">
            <h1>{props.title}</h1>
            <hr></hr>
        </div>
    )
}

export default Heading