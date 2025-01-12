import React from 'react';
import TimeTrialForm from './components/TimeTrialForm';
import TimeTrialsList from './components/TimeTrialsList';
import './styles.css';

const App = () => {
  const fetchData = () => {
    // Implement fetch data logic here if needed
  };

  return (
    <div>
      <h1>Mario Kart 64 Time Trials</h1>
      <TimeTrialForm fetchData={fetchData} />
      <TimeTrialsList fetchData={fetchData} />
    </div>
  );
};

export default App;
