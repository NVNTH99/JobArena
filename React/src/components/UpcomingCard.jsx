import React from "react";
import "./UpcomingCard.css";

function Event(props){
    return(
        <div className="eventCard">
            <h4>{props.event.title}</h4>
            <div className="line1">
                {props.event.name}, #{props.event.id}
            </div>
            <div className="line2">
                Interview on {props.event.date}, {props.event.time}
            </div>
        </div>
    )
}

function UpcomingCard(props){
    var events = props.event;
    return(
        <div className="upcoming">
            <div className="upcoming_container">
                <div className="upcoming_heading"><h2>Upcoming Events</h2></div>
                {events.map((event,index)=> (<Event key = {index} event={event}/>))}
            </div>
        </div>
    );
}

export default UpcomingCard
