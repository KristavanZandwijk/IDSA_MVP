import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import OfferOverview from "components/OfferOverview";
import CreateNewOffer from "components/CreateNewOffer";
import CompleteDataOffers from "components/CompleteDataOffers";

const Offer = () => {
  const theme = useTheme();

  return (
    <Box m="2rem">
      <Header title="Offers" subtitle="Below all your offers are displayed." />

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="2rem"
        mt="2rem"
      >
        {/* LEFT: Offer Overview */}
        <Box
          flex={1}
          p="1.5rem"
          borderRadius="1rem"
          bgcolor={theme.palette.background.alt}
          sx={{ boxShadow: 3 }}
        >
          <OfferOverview />
          <CompleteDataOffers/>
        </Box>

        {/* RIGHT: Create New Offer */}
        <Box
          flex={1}
          p="1.5rem"
          borderRadius="1rem"
          bgcolor={theme.palette.background.alt}
          sx={{ boxShadow: 3 }}
        >
          <CreateNewOffer />
        </Box>
      </Box>
    </Box>
  );
};

export default Offer;
