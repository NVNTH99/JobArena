import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';  
import NoPage from './Pages/NoPage';
import Login from './Pages/Login';
import JobApplication from './Pages/JobApplication';
import CandidateProfle from "./Pages/CandidateProfile";
import CandidateHome from './Pages/CandidateHome';
import RecruiterHome from './Pages/RecruiterHome';
import Cand_profile from './Pages/cand_profile';
import CandidateRecommendedJobs from './Pages/CandidateRecommendedJobs';
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
        <Route path="/candidate/home" element={<CandidateHome/>}/>
        <Route path="/recruiter/job_application" element={<JobApplication/>}/>
        <Route path="/recruiter/candidate_profile" element={<CandidateProfle/>}/>
        <Route path="/candidate/profile" element={<Cand_profile/>}/>
        <Route path="/candidate/recommended_jobs" element={<CandidateRecommendedJobs/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
