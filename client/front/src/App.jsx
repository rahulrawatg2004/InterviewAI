//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice.js';

export const ServerURL = "http://localhost:8000";
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
    </Routes>
  )
}

export default App