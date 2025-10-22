// src/pages/YourConnector.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ApiRequestPanel from "../components/ApiRequestPanelA";

const YourConnector = () => {
  const [data, setData] = useState(null);
  const [loadingConnector, setLoadingConnector] = useState(true);
  const [errorConnector, setErrorConnector] = useState(null);

  const fetchConnectorData = () => {
    setLoadingConnector(true);
    setErrorConnector(null);
    fetch("/api")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoadingConnector(false);
      })
      .catch((err) => {
        setErrorConnector(err.message);
        setLoadingConnector(false);
      });
  };

  useEffect(() => {
    fetchConnectorData();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      minHeight="calc(100vh - 60px)"
      bgcolor="background.default"
      px={6}
      py={4}
    >
      <Box display="flex" width="100%" maxWidth={1400} gap={4}>
        {/* Left Panel - Connector Info */}
        <Box
          flex={1}
          bgcolor="background.paper"
          p={3}
          borderRadius={2}
          boxShadow={1}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Your Connector</Typography>
            <Button variant="contained" onClick={fetchConnectorData}>
              Refresh
            </Button>
          </Box>
          <Box mt={2} sx={{ overflowX: "auto" }}>
            {loadingConnector && <Typography>Loading...</Typography>}
            {errorConnector && (
              <Typography color="error">{errorConnector}</Typography>
            )}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </Box>
        </Box>

        {/* Right Panel - Reusable API Request */}
        <Box flex={2}>
          <ApiRequestPanel
            title="Connector API Tester"
            defaultMethod="GET"
            defaultEndpoint="/api/offers"
            defaultBody={JSON.stringify(
              {
                title: "DWD Weather Warnings",
                description: "DWD weather warnings for Germany.",
                keywords: ["DWD"],
                publisher: "https://dwd.com",
                language: "DE",
                license: "",
                sovereign: "https://dwd.com",
                endpointDocumentation: "",
                paymentModality: "undefined",
              },
              null,
              2
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default YourConnector;
