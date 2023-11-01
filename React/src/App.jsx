import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';  
import NoPage from './Pages/NoPage';
import Login from './Pages/Login';
import JobApplication from './Pages/JobApplication';
import CandidateProfle from "./Pages/RecruiterCandidateProfile";
import CandidateHome from './Pages/CandidateHome';
import RecruiterHome from './Pages/RecruiterHome';
import Cand_profile from './Pages/cand_profile';
import CandidateRecommendedJobs from './Pages/CandidateRecommendedJobs';
import RecruiterAddJob from './Pages/RecruiterAddJob';
import CandidateAppliedJobs from './Pages/CandidateAppliedJobs';
import SignUp from './Pages/SignUp';


function App() {
  // const history = useHistory();
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/candidate/home" element={<CandidateHome/>}/>
        <Route path="/candidate/profile" element={<Cand_profile/>}/>
        <Route path="/candidate/recommended_jobs" element={<CandidateRecommendedJobs/>}/>
        <Route path="/candidate/applied_jobs" element={<CandidateAppliedJobs/>}/>
        <Route path="/recruiter/home" element={<RecruiterHome/>}/>
        <Route path="/recruiter/job_application" element={<JobApplication/>}/>
        <Route path="/recruiter/candidate_profile" element={<CandidateProfle/>}/>
        <Route path="/recruiter/add_job" element={<RecruiterAddJob/>}/>
        
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
