// src/components/ApiRequestPanel.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const ApiRequestPanel = ({
  title = "API Request",
  defaultMethod = "GET",
  defaultEndpoint = "/api",
  defaultBody = "{}",
}) => {
  const [method, setMethod] = useState(defaultMethod);
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [bodyText, setBodyText] = useState(defaultBody);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // Common API endpoints (proxied via Vite)
  const endpointSuggestions = [
    "/api/offers",
    "/api/catalogs",
    "/api/rules",
    "/api/contracts",
    "/api/artifacts",
    "/api/representations",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    let jsonBody;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        jsonBody = JSON.parse(bodyText);
      } catch (err) {
        setError("Invalid JSON format in request body.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body:
          ["POST", "PUT", "PATCH"].includes(method) && jsonBody
            ? JSON.stringify(jsonBody)
            : undefined,
      });

      const text = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }

      setResponse(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgcolor="background.paper"
      p={3}
      borderRadius={2}
      boxShadow={1}
      width="100%"
    >
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      {/* Method and Endpoint selection */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          sx={{ width: 130 }}
        >
          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth>
          <InputLabel>Endpoint</InputLabel>
          <Select
            value={endpointSuggestions.includes(endpoint) ? endpoint : ""}
            label="Endpoint"
            onChange={(e) => setEndpoint(e.target.value)}
          >
            {endpointSuggestions.map((url) => (
              <MenuItem key={url} value={url}>
                {url}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Custom endpoint input (editable) */}
      <TextField
        label="Custom Endpoint (editable)"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Request body */}
      {["POST", "PUT", "PATCH"].includes(method) && (
        <TextField
          label="Request Body"
          multiline
          minRows={10}
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}

      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </Button>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {response && (
        <Box
          mt={2}
          sx={{
            overflowX: "auto",
            bgcolor: "grey.50",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1">Response:</Typography>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default ApiRequestPanel;
