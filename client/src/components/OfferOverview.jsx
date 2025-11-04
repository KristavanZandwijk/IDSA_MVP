import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const OfferOverview = () => {
  const theme = useTheme();
  const [offers, setOffers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/offers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const resources = data._embedded?.resources || [];

      // Sort by creation date descending
      const sortedOffers = [...resources].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );

      setOffers(sortedOffers);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleShowMore = () => setVisibleCount(prev => prev + 5);
  const handleRefresh = () => {
    fetchOffers();
    setVisibleCount(10);
    setSearch("");
  };

  const filteredOffers = offers.filter(offer =>
    offer.keywords?.some(kw => kw.toLowerCase().includes(search.toLowerCase()))
  );

  const visibleOffers = filteredOffers.slice(0, visibleCount);

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.secondary[100]}>
          Offer Overview
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      <Typography variant="body1" color={theme.palette.neutral[200]} mb={2}>
        Here you can see the offers that were made by your connector. The offers
        are shown from new to old. Use the search bar to filter by keyword.
      </Typography>

      {/* Search bar */}
      <Box mb={2}>
        <TextField
          fullWidth
          size="small"
          label="Search by keyword"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {/* No offers */}
      {!loading && !error && filteredOffers.length === 0 && (
        <Typography mt={2}>No offers found.</Typography>
      )}

      {/* Offers grid */}
      {!loading && !error && filteredOffers.length > 0 && (
        <>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={3}
            mt={2}
          >
            {visibleOffers.map((offer, index) => (
              <Box
                key={index}
                sx={{
                  flex: "1 1 calc(33.33% - 16px)",
                  minWidth: 180,
                  maxWidth: "100%",
                }}
              >
                <Card
                  sx={{
                    minHeight: 220,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {offer.title || `Offer #${index + 1}`}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {offer.description || "No description provided."}
                    </Typography>

                    {offer.keywords?.length > 0 && (
                      <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                        {offer.keywords.map((kw, i) => (
                          <Chip
                            key={i}
                            label={kw}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    <Typography variant="caption" display="block" mt={1}>
                      Publisher: {offer.publisher || "Unknown"}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Language: {offer.language || "N/A"}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Created:{" "}
                      {offer.creationDate
                        ? new Date(offer.creationDate).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {visibleCount < filteredOffers.length && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" color="primary" onClick={handleShowMore}>
                Show more offers
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default OfferOverview;
