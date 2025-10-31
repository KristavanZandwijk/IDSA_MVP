import React, { useEffect, useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import Header from "components/Header";

const Offer = () => {
  const theme = useTheme();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        const resources = data._embedded?.resources || [];
        setOffers(resources);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <Box m="2rem">
      <Header title="Offers" subtitle="Below all your offers are displayed." />

      {/* Two-column layout */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="2rem"
        mt="2rem"
      >
        {/* LEFT BOX */}
        <Box
          flex={1}
          p="1.5rem"
          borderRadius="1rem"
          bgcolor={theme.palette.background.alt}
          sx={{ boxShadow: 3, minHeight: "200px" }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[100]}
            mb="1rem"
          >
            Offer Overview
          </Typography>

          {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {!loading && !error && offers.length === 0 && (
        <Typography mt={2}>No offers found.</Typography>
      )}

      {!loading && !error && offers.length > 0 && (
        <Grid container spacing={3} mt={2}>
          {offers.map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ minHeight: 200, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {offer.title || `Offer #${index + 1}`}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {offer.description || 'No description provided.'}
                  </Typography>

                  {offer.keywords?.length > 0 && (
                    <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                      {offer.keywords.map((kw, i) => (
                        <Chip label={kw} key={i} size="small" color="primary" />
                      ))}
                    </Box>
                  )}

                  <Typography variant="caption" display="block" mt={1}>
                    Publisher: {offer.publisher || 'Unknown'}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Language: {offer.language || 'N/A'}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Created: {offer.creationDate ? new Date(offer.creationDate).toLocaleDateString() : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
 </Box>

        {/* RIGHT BOX */}
        <Box
          flex={1}
          p="1.5rem"
          borderRadius="1rem"
          bgcolor={theme.palette.background.alt}
          sx={{ boxShadow: 3, minHeight: "200px" }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[100]}
            mb="1rem"
          >
            Create New Offer
          </Typography>

          <Typography variant="body1" color={theme.palette.neutral[200]}>
            This is another empty box. Add any content or components you like.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Offer
