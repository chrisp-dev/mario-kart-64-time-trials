import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeTrialsList = () => {
  const [timeTrials, setTimeTrials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    axios.get('/time_trials')
      .then(response => {
        // Ensure timeTrials is always an array
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

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Time Trials</h2>
      {timeTrials.length === 0 ? (
        <div>No time trials available. Please add some time trial records.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Track ID</th>
              <th>Character</th>
              <th>Lap 1</th>
              <th>Lap 2</th>
              <th>Lap 3</th>
              <th>Final Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {timeTrials.map((trial) => (
              <tr key={trial.id}>
                <td>{trial.date}</td>
                <td>{trial.track_id}</td>
                <td>{trial.character}</td>
                <td>{trial.lap1}</td>
                <td>{trial.lap2}</td>
                <td>{trial.lap3}</td>
                <td>{trial.final_time}</td>
                <td>{trial.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeTrialsList;
