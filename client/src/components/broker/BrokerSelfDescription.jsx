import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  useTheme,
  Divider,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const BrokerSelfDescription = () => {
  const theme = useTheme(); // ✅ define theme

  return (
    <Box
      flex={1}
      p="1.5rem"
      borderRadius="1rem"
      bgcolor={theme.palette.background.alt} // now theme is defined
      sx={{ boxShadow: 3 }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.secondary[100]}>
          Broker Self-Description
        </Typography>
      </Box>
    </Box>
  );
};

export default BrokerSelfDescription;
