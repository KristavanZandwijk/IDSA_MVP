import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const DataConsumer = () => {
  return (
    <Box m="2rem">
      <Header title="Catalogs" subtitle="View catalogs provided via your connector." />
    </Box>
  );
};

export default DataConsumer;
