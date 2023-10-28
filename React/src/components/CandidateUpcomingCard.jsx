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
                <p style={{color: "#505967"}}>{props.event.company} - {props.event.title}</p>
                <p style={{color: "#505967"}}>{props.event.location}</p>
                <p>Interview on {props.event.date}, {props.event.time}</p>
            </div>
        </>
    )
}

export default CandidateUpcomingCard;