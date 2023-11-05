import React from "react";
import Model from "react-modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import axios from "axios";
import 'react-time-picker/dist/TimePicker.css';
// import '../Pages/RecruiterCandidateProfile.css'

function InviteRejectButton(props){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('link');
    // const [startDate, setStartDate] = useState(new Date());
    // const [value, onChange] = useState('10:00');
    const [interviewdetails,setinterview] = useState({
      link: '',
      venue:'',
      date: '',
      time:'10:00'
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setinterview((prevdetails)=>({
        ...prevdetails,
        [name]: value
      }));
    };

    const openModal = () => {
      setModalOpen(true);
    }
    const closeModal = () => {
      setModalOpen(false);
    }

    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const scheduleInterview = () => {
      let date_time = interviewdetails.date + ' ' + interviewdetails.time;
      console.log(interviewdetails.time)
      date_time = new Date(date_time).toISOString().slice(0,19).replace('T',' ')
      axios.post(`${import.meta.env.VITE_ROOT}/application/statuschange`,{
        app_id: props.app_id,
        tostatus: 'Shortlisted',
        date_time: date_time,
        venue: interviewdetails.venue,
        link: interviewdetails.link
      })
      .then(response => {
        props.fetchCand()
      })
      .catch(error => {
        console.log(error, "Error while shortlisting candidate")
      })
    }

    const Reject = () => {
      axios.post(`${import.meta.env.VITE_ROOT}/application/statuschange`,{
        app_id: props.app_id,
        tostatus: 'Rejected'
      })
      .then(response => {
        props.fetchCand()
      })
      .catch(error=> {
        console.log("Error while accepting application")
      })
    }

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
          <form className="interview_form">
            <div className="interview_radio">
              <label><input type="radio" name="radio" value="link" checked={selectedValue === 'link'} onChange={handleRadioChange}/>Link</label>
              <label><input type="radio" name="radio" value="venue" checked={selectedValue === 'venue'} onChange={handleRadioChange}/>Venue</label>
            </div>
            <div className="interview_venue">
              {selectedValue === 'link' ? (
                <div><input className="interview_form_input" type="text" value={interviewdetails.link} name="link" onChange={handleChange}/></div>
              ) : selectedValue === 'venue' ? (
                <div><input className="interview_form_input" type="text" value={interviewdetails.venue} name="venue" onChange={handleChange}/></div>
              ) : (
                <div>Select an option</div>
              )}
            </div>
            <div className="interview_date">
              Date
              {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              <input className="interview_form_input" name="date" value={interviewdetails.date} type="date" onChange={handleChange}/>
            </div>
            <div className="interview_time">
              Time
              {/* <TimePicker className="custom-time-picker-input" onChange={onChange} value={value} disableClock={true}/> */}
              <input className="interview_form_input" name="time" value={interviewdetails.time} type="time" onChange={handleChange}/>
            </div>
            {/* <input className="submit" type="submit"/> */}
            <button type="button" className="submit" onClick={scheduleInterview}>Submit</button>
          </form>
          {/* <button className="submit" onClick={scheduleInterview}>Submit</button> */}
        </Model>
        <button className="rejectButton" onClick={Reject}>Reject</button>
      </div>
    )
}

export default InviteRejectButton