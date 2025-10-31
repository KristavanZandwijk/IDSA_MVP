import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import CatalogOverview from 'components/CatalogOverview';


const Catalog = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="New Contract" subtitle="Create a New Contract here." />
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
            Catalog Overview
          </Typography>

          <CatalogOverview/>
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
            Create New Catalog
          </Typography>

          <Typography variant="body1" color={theme.palette.neutral[200]}>
            This is another empty box. Add any content or components you like.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Catalog;
