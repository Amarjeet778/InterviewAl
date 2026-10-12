import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'


export const ServerUrl = "https://interviewal-7psp.onrender.com"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(ServerUrl + '/api/user/current-user', {withCredentials: true });// Include cookies in the request
        dispatch(setUserdata(response.data.user));
        
      } catch (error) {
          console.log('Error fetching current user:', error);
          dispatch(setUserdata(null)); // Set user data to null in case of an error
        }
    };

    fetchCurrentUser();

  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/interview' element={<InterviewPage />} />
        <Route path='/history' element={<InterviewHistory />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/report/:id' element={<InterviewReport />} />
      </Routes> 
    </>
  )
}

export default App
