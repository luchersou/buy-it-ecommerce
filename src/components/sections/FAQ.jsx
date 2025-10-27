import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "../../data/faqData";
import Wrapper from "../layout/Wrapper";
import colors from "../../theme/colors";

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Wrapper>
      <Box
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={5}
          sx={{ color: colors["--clr-black-1"] }}
        >
         Frequently Asked Questions (FAQ)
        </Typography>

        {faqData.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              borderRadius: 3,
              mb: 2,
              boxShadow: colors["--clr-shadow-light"],
              "&:before": { display: "none" },
              bgcolor: expanded === index ? colors["--clr-gray-11"] : colors["--clr-white-1"],
              transition: "all 0.2s ease",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: colors["--clr-black-1"] }} />}
              sx={{
                "& .MuiAccordionSummary-content": { my: 1 },
              }}
            >
              <Typography fontWeight={600} variant="subtitle1">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                color={colors["--clr-black-1"]}
                sx={{ lineHeight: 1.6 }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Wrapper>
  );
}
