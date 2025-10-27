// src/components/layout/Wrapper.jsx
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import colors from "../../theme/colors";

const MotionBox = motion.create(Box);

export default function Wrapper({ children }) {
  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        my: { xs: 3, md: 3 },
      }}
    >
      <Box
        sx={{
          backgroundColor: colors["--clr-white-2"],
          boxShadow: colors["--clr-shadow-hover-1"],
          borderRadius: 2,
          width: "98%",
          px: { xs: 1, md: 3 },
          py: { xs: 2, sm: 3 },
          transition: "box-shadow 0.9s ease",
          "&:hover": {
            boxShadow: colors["--clr-shadow-hover-2"],
          },
        }}
      >
        {children}
      </Box>
    </MotionBox>
  );
}
