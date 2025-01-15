import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mario Kart 64 Time Trials
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/basic-layout">Basic Layout</Button>
          <Button color="inherit" component={Link} to="/time-trials">Time Trials</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
