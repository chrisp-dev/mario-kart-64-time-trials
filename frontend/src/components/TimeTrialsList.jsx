import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const TimeTrialsList = ({ fetchData }) => {
  const [timeTrials, setTimeTrials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    axios.get('/time_trials')
      .then(response => {
        const responseData = Array.isArray(response.data) ? response.data : [];
        setTimeTrials(responseData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching time trials:', error);
        setTimeTrials([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212'
      },
      text: {
        primary: '#ffffff'
      }
    }
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff'
      },
      text: {
        primary: '#000000'
      }
    }
  });

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ padding: 2, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Time Trials
        </Typography>
        {timeTrials.length === 0 ? (
          <Typography>No time trials available. Please add some time trial records.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Track ID</TableCell>
                <TableCell>Character</TableCell>
                <TableCell>Lap 1</TableCell>
                <TableCell>Lap 2</TableCell>
                <TableCell>Lap 3</TableCell>
                <TableCell>Final Time</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeTrials.map((trial) => (
                <TableRow key={trial.id}>
                  <TableCell>{new Date(trial.date).toLocaleString()}</TableCell>
                  <TableCell>{trial.track_id}</TableCell>
                  <TableCell>{trial.character}</TableCell>
                  <TableCell>{trial.lap1}</TableCell>
                  <TableCell>{trial.lap2}</TableCell>
                  <TableCell>{trial.lap3}</TableCell>
                  <TableCell>{trial.final_time}</TableCell>
                  <TableCell>{trial.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default TimeTrialsList;
