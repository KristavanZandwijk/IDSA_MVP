import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import Header from 'components/Header';

const Broker = () => {
  const theme = useTheme();
 
  return (
    <Box m="1.5rem 2.5rem">
      <Header title = "Broker" subtitle= "This is the broker of the data space. Find other connectors and their data here."/>
    </Box>
  );
};

export default Broker;
