import React from "react";
import Model from "react-modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
// import '../Pages/RecruiterCandidateProfile.css'

function InterviewSubmit(){

}

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
    const [selectedValue, setSelectedValue] = useState('link');
    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };
    return (
      <div>
        <button className="inviteButton" onClick={openModal}>Invite for interview</button>
        <Model isOpen={isModalOpen} onRequestClose={closeModal} 
        style={{
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
            height:"55%",
            borderRadius:"15px"
          }
        }}
        >
          <h2 className="interview_form_heading">Schedule interview</h2>
          <form className="interview_form" onSubmit={InterviewSubmit}>
            <div className="interview_radio">
              <label><input type="radio" name="radio" value="link" checked={selectedValue === 'link'} onChange={handleRadioChange}/>Link</label>
              <label><input type="radio" name="radio" value="venue" checked={selectedValue === 'venue'} onChange={handleRadioChange}/>Venue</label>
            </div>
            <div className="interview_venue">
              {selectedValue === 'link' ? (
                <div><input className="interview_form_input" type="text"/></div>
              ) : selectedValue === 'venue' ? (
                <div><input className="interview_form_input" type="text"/></div>
              ) : (
                <div>Select an option</div>
              )}
            </div>
            <div className="interview_date">
              Date
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="interview_time">
              Time
              <TimePicker className="custom-time-picker-input" onChange={onChange} value={value} disableClock={true}/>
            </div>
            <input className="submit" type="submit"/>
          </form>
        </Model>
        <button className="rejectButton">Reject</button>
      </div>
    )
}

export default InviteRejectButton