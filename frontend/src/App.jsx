import React, { useState } from 'react';
import axios from './api/axios'; // Update the import to use the custom axios instance
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimeTrialForm from './components/TimeTrialForm';
import TimeTrialsList from './components/TimeTrialsList';
import BasicLayout from './components/BasicLayout';
import Navbar from './components/Navbar';
import TimeTrialPage from './components/TimeTrialPage';
import './styles.css';

const App = () => {
  const [timeTrials, setTimeTrials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
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
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Mario Kart 64 Time Trials</h1>
            <TimeTrialForm fetchData={fetchData} />
            <TimeTrialsList fetchData={fetchData} timeTrials={timeTrials} isLoading={isLoading} />
          </div>
        } />
        <Route path="/basic-layout" element={<div className="full-window"><BasicLayout /></div>} />
        <Route path="/time-trials" element={<TimeTrialPage fetchData={fetchData} timeTrials={timeTrials} isLoading={isLoading} />} />
      </Routes>
    </Router>
  );
};

export default App;
