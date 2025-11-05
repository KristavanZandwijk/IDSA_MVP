import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import ContractOverview from "components/ContractOverview";
import RulesOverview from "components/RulesOverview";
import CreateNewRule from "components/CreateNewRule";
import CreateNewContract from "components/CreateNewContract";
import LinkRulesToContract from "components/LinkRulesToContract";
import LinkContractToOffer from "components/LinkContractToOffer";


const Contract = () => {
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
          display="flex"
          flexDirection="column"
          gap="2rem"
          alignItems="stretch"
        >
          <ContractOverview/>
          <RulesOverview/>
        </Box>

        {/* RIGHT BOX */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap="2rem"
          alignItems="stretch"
        >
          <CreateNewContract/>
          <CreateNewRule/>
          <LinkRulesToContract/>
          <LinkContractToOffer/>
        </Box>
      </Box>
    </Box>
  );
};
export default Contract;
