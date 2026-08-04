//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice.js';
import InterviewPage from './pages/InterviewPage.jsx';
import InterviewHistory from './pages/InterviewHistory.jsx';
import Pricing from './pages/Pricing.jsx';
import InterviewReport from './pages/InterviewReport.jsx';
export const ServerURL = "https://interviewai-u7rb.onrender.com";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${ServerURL}/api/user/current-user`, { withCredentials: true });
        const user = response?.data?.user ?? response?.data;
        dispatch(setUser(user));
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(setUser(null));
      }
    };

    fetchCurrentUser();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage/>} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/history" element={<InterviewHistory/>} />
      <Route path="/report/:id" element={<InterviewReport/>} />

    </Routes>
  )
}

export default App
