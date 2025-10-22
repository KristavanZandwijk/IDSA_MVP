import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Broker = () => {
  const [data, setData] = useState(null);
  const [loadingConnector, setLoadingConnector] = useState(true);
  const [errorConnector, setErrorConnector] = useState(null);

  const fetchConnectorData = async () => {
    setLoadingConnector(true);
    setErrorConnector(null);

    try {
      const res = await fetch("/brokerAPI");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const text = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }

      setData(parsed);
    } catch (err) {
      setErrorConnector(err.message);
    } finally {
      setLoadingConnector(false);
    }
  };

  useEffect(() => {
    fetchConnectorData();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      bgcolor="background.default"
      px={4}
      py={4}
    >
      <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
        {/* Panel */}
        <Box
          width={600}
          bgcolor="background.paper"
          p={3}
          borderRadius={2}
          boxShadow={1}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Broker Information</Typography>
            <Button variant="contained" onClick={fetchConnectorData}>
              Refresh
            </Button>
          </Box>

          <Box mt={2} sx={{ overflowX: "auto" }}>
            {loadingConnector && <Typography>Loading...</Typography>}
            {errorConnector && <Typography color="error">{errorConnector}</Typography>}
            {data && <pre>{typeof data === "string" ? data : JSON.stringify(data, null, 2)}</pre>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Broker;
