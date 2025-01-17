import React, { useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';

const TimeTrialsList = ({ fetchData, timeTrials, isLoading }) => {
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ padding: 2, width: '100%' }} className="full-window">
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ marginTop: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Time Trials List
      </Typography>
      {timeTrials.length === 0 ? (
        <Typography variant="body1">No time trials available. Please add some records.</Typography>
      ) : (
        <TableContainer component={Paper}>
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
        </TableContainer>
      )}
    </Box>
  );
};

export default TimeTrialsList;