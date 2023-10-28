import React from "react";

function Event(props){
    return(
        <div className="eventCard">
            <h4>{props.event.title}</h4>
            <div className="line1">
                {props.event.name}, {props.event.id}
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
        <>
            <div className="upcoming">
                <h2>Upcoming Events</h2>
                {events.map((event,index)=> (<Event key = {index} event={event}/>))}
            </div>
        </>
    );
}

export default UpcomingCard


// .upcoming{
//     margin : 5%;
//     padding: 5%;
//     background:rgb(242, 242, 242);
//     border-radius: 1rem;
//     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//     height: 30rem;
//     width: 18rem;
//     font-family: "Myanmar Khyay-Regular", Helvetica;
// }

// .eventCard{
//     margin-top:10pt;
//     background: rgb(217,217,217);
//     border-radius: 5pt;
//     padding: 10pt;
//     width:16.25rem;
// }

// .eventCard h4{
//     margin:0;
//     color: rgb(80,89,103);
// }

// .eventCard .line1,.line2{
//     font-size: 10pt;
// }

// .eventCard .line1{
//     color: rgb(80,89,103);
// }

// .upcoming h2{
//     margin:0;
// }