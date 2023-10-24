import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';  
import NoPage from './Pages/NoPage';
import Login from './Pages/Login';
import JobApplication from './Pages/JobApplication';
import CandidateProfle from "./Pages/CandidateProfile";

function App() {
  // const history = useHistory();
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<NoPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recruiter/home" element={<RecruiterHome/>}/>
        <Route path="/recruiter/job_application" element={<JobApplication/>}/>
        <Route path="/recruiter/candidate_profile" element={<CandidateProfle/>}/>
        <Route path="/candidate/profile" element={<cand_profile/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
