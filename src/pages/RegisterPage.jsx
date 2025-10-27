import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link,
  Divider,
} from "@mui/material";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import colors from "../theme/colors";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Firebase error:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Error creating account. Please try again.");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{
        bgcolor: colors["--clr-white-3"],
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 400 },
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Create your account
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <TextField
              label="Confirm Password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />

            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: colors["--clr-yellow-1"],
                color: "black",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": { bgcolor: colors["--clr-yellow-2"] },
              }}
            >
              SIGN UP
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" textAlign="center">
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
