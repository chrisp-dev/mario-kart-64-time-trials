import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const TimeTrialList = ({ fetchData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    axios.get('/timeTrials')
      .then(response => {
        const responseData = Array.isArray(response.data) ? response.data : [];
        setData(responseData);
      })
      .catch(error => {
        console.error('Error fetching time trials:', error);
        setData([]);
      });
  }, []);

  const formatTime = (timeString) => {
    const [minutes, seconds, milliseconds] = timeString.split(':');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#121212', // Dark background
        color: '#ffffff', // Light font color
      }}
    >
      <Typography variant="h4" gutterBottom>
        Time Trial Records
      </Typography>
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
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No data
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
                <TableCell>{row.track_id}</TableCell>
                <TableCell>{row.character}</TableCell>
                <TableCell>{formatTime(row.lap1)}</TableCell>
                <TableCell>{formatTime(row.lap2)}</TableCell>
                <TableCell>{formatTime(row.lap3)}</TableCell>
                <TableCell>{formatTime(row.final_time)}</TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TimeTrialList;
