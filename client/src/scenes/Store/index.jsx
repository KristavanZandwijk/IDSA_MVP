import React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";


const Store = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Store" subtitle="This is the Store of the data space." />
    </Box>
  );
};

export default Store;
