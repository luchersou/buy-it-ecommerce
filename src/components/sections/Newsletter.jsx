import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
} from "@mui/material";
import Wrapper from "../layout/Wrapper";
import colors from "../../theme/colors";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim()) {
      return setError("Please enter your email.");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email.");
    }

    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Wrapper>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: colors["--clr-black-1"],
            fontSize: { xs: "1.5rem", sm: "1.875rem", md: "2.125rem" },
            lineHeight: 1.3,
          }}
        >
          Get{" "}
          <Box component="span" sx={{ color: colors["--clr-yellow-1"] }}>
            10% OFF
          </Box>{" "}
          on your first purchase!
        </Typography>

        {/* Subtexto */}
        <Typography
          variant="body1"
          sx={{
            color: colors["--clr-gray-3"],
            maxWidth: 500,
            fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          Subscribe to our newsletter and get exclusive offers, new arrivals, and discounts directly in your email.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <TextField
            fullWidth
            type="email"
            label="Enter your email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              backgroundColor: colors["--clr-white-1"],
              borderRadius: 2,
              "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiFormHelperText-root":
                {
                  fontSize: {
                    xs: "0.875rem",
                    sm: "0.9375rem",
                    md: "1rem",
                  },
                },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors["--clr-yellow-1"],
              color: colors["--clr-black-1"],
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              minWidth: { xs: "100%", sm: "auto" },
              fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
              "&:hover": { backgroundColor: colors["--clr-yellow-2"] },
            }}
          >
            SUBSCRIBE
          </Button>
        </Box>

        {success && (
          <Alert
            severity="success"
            sx={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 2,
              fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.9375rem" },
            }}
          >
           Thank you for subscribing! You will soon receive our offers.
          </Alert>
        )}
      </Container>
    </Wrapper>
  );
}
