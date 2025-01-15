import React, { useState } from 'react';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, MenuItem, Select, InputLabel, FormControl, Slider } from '@mui/material';

const BasicLayout = () => {
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

  const characters = [
    'Mario', 'Luigi', 'Peach', 'Toad', 'Yoshi', 'Donkey Kong', 'Wario', 'Bowser'
  ];

  const [lapTimes, setLapTimes] = useState({
    lap1: { minutes: 0, seconds: 0, milliseconds: 0 },
    lap2: { minutes: 0, seconds: 0, milliseconds: 0 },
    lap3: { minutes: 0, seconds: 0, milliseconds: 0 },
  });

  const handleSliderChange = (lap, value, event) => {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    let milliseconds = 0;

    if (event.shiftKey) {
      minutes = 0;
      milliseconds = 0;
    } else if (event.ctrlKey) {
      minutes = 0;
      seconds = 0;
      milliseconds = value;
    }

    setLapTimes((prevTimes) => ({
      ...prevTimes,
      [lap]: {
        minutes,
        seconds,
        milliseconds,
      },
    }));
  };

  return (
    (<ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 2, width: '100%' }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '@media (min-width: 600px)': {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Character</InputLabel>
            <Select label="Character">
              {characters.map((character) => (
                <MenuItem key={character} value={character}>
                  {character}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {['lap1', 'lap2', 'lap3'].map((lap) => (
            <Box key={lap} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>{`Lap ${lap.charAt(3)} Time`}</Typography>
              <Slider
                value={lapTimes[lap].minutes * 60 + lapTimes[lap].seconds + lapTimes[lap].milliseconds}
                onChange={(e, value) => handleSliderChange(lap, value, e)}
                aria-labelledby="time-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={90}
                sx={{ width: '100%' }}
              />
            </Box>
          ))}
          <TextField
            label="Place"
            variant="outlined"
            sx={{ minWidth: 120 }}
            type="number"
            slotProps={{
              htmlInput: { min: 1, max: 8 }
            }}
          />
          <Button variant="contained" color="primary">Submit</Button>
        </Box>
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            Race Data
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Lap 1 Time</TableCell>
                <TableCell>Lap 2 Time</TableCell>
                <TableCell>Lap 3 Time</TableCell>
                <TableCell>Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Mario</TableCell>
                <TableCell>1:20</TableCell>
                <TableCell>1:18</TableCell>
                <TableCell>1:22</TableCell>
                <TableCell>1st</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Luigi</TableCell>
                <TableCell>1:25</TableCell>
                <TableCell>1:24</TableCell>
                <TableCell>1:23</TableCell>
                <TableCell>2nd</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </ThemeProvider>)
  );
};

export default BasicLayout;
