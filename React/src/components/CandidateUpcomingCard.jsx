import React from "react";

function CandidateUpcomingCard(props){
    return(
        <>
            <div className="candidate-upcoming-container">
                <h2>Upcoming events</h2>
                <div>
                {
                    props.upcoming.map((e, index) =>
                        <EventCard key = {index} event = {e}/>
                    )
                }
                </div>                
            </div>
        </>
    )
}

function EventCard(props){
    return(
        <>
            <div className="candidate-event-card">
                <p style={{color: "#505967"}}>{props.event.company} - {props.event.Title}</p>
                <p style={{color: "#505967"}}>{props.event.Location}</p>
                <p>Interview on {props.event.Date}, {props.event.Time}</p>
            </div>
        </>
    )
}

export default CandidateUpcomingCard;