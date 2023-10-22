import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';  
import NoPage from './Pages/NoPage';
import Login from './Pages/Login';

function App() {
  // const history = useHistory();
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<NoPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recruiter/job_application" element={<JobApplication/>}/>
        <Route path="/recruiter/candidate_profile" element={<CandidateProfle/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
