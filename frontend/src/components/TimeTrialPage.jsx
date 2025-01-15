import React from 'react';
import BasicLayout from './BasicLayout';
import TimeTrialForm from './TimeTrialForm';
import TimeTrialsList from './TimeTrialsList';

const TimeTrialPage = ({ fetchData, timeTrials, isLoading }) => {
  return (
    <BasicLayout>
      <h1>Mario Kart 64 Time Trials</h1>
      <TimeTrialForm />
      <TimeTrialsList fetchData={fetchData} timeTrials={Array.isArray(timeTrials) ? timeTrials : []} isLoading={isLoading} />
    </BasicLayout>
  );
};

export default TimeTrialPage;
