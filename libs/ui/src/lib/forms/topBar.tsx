import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './forms.css';

export default function TopBar() {
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: '#1976d2',
            color: '#fff',
          }}
        >
          <Typography variant="h5" component="div" className="topBarText">
            Task Management System
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
