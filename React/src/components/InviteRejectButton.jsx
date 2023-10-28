import React from "react";
import Model from "react-modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';

function InviteRejectButton(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('10:00');
    const openModal = () => {
      setModalOpen(true);
    }
    const closeModal = () => {
      setModalOpen(false);
    }
    return (
      <div>
        <button className="inviteButton" onClick={openModal}>Invite for interview</button>
        <Model isOpen={isModalOpen} onRequestClose={closeModal} style={{
          overlay:{
            background:"rgba(0,0,0,0.5)",
            display: "flex", // Set to flex
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
        },
          content:{
            top:"25%",
            left:"40%",
            right:"auto",
            bottom:"auto",
            width:"20%",
            height:"50%",
            borderRadius:"15px"
          }
        }}>
          <h2>Schedule interview</h2>
          <form>
            <div className="interview_venue">
              Link/venue : 
              <input type="text"/>
            </div>
            <div className="interview_date">
              Date :
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="interview_time">
              Time :
              <TimePicker className="custom-time-picker-input" onChange={onChange} value={value} disableClock={true}/>
            </div>
            <input type="submit"/>
          </form>
        </Model>
        <button className="rejectButton">Reject</button>
      </div>
    )
}

export default InviteRejectButton