import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from './api/axios'; // Update the import to use the custom axios instance
import Navbar from './components/common/Navbar';
import TimeTrialForm from './components/forms/TimeTrialForm';
import TimeTrialsList from './components/lists/TimeTrialsList';
import BasicLayout from './components/common/BasicLayout';
import TimeTrialPage from './pages/TimeTrialPage';
import OCRPage from './pages/OCRPage';
import './App.css';

const App = () => {
  const [timeTrials, setTimeTrials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    axios.get('/time_trials')
      .then(response => {
        const trials = Array.isArray(response.data) ? response.data : [];
        setTimeTrials(trials);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setTimeTrials([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <div className="full-window">
              <Box sx={{ padding: 2, width: '100%' }} className="full-window">
                <h1>Mario Kart 64 Time Trials</h1>
                <TimeTrialForm fetchData={fetchData} />
                <TimeTrialsList fetchData={fetchData} timeTrials={timeTrials} isLoading={isLoading} />
              </Box>
            </div>
          } />
          <Route path="/basic-layout" element={<div className="full-window"><BasicLayout /></div>} />
          <Route path="/time-trials" element={<TimeTrialPage fetchData={fetchData} timeTrials={timeTrials} isLoading={isLoading} />} />
          <Route path="/ocr" element={<OCRPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
