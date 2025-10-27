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
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import colors from "../theme/colors";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true }); 
    } catch (error) {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ 
        bgcolor: colors["--clr-white-2"],
       }}
    >
      <Card
        sx={{
          width: {
            xs: '90%',   
            sm: 380,     
            md: 400,     
          },
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            gutterBottom
            sx={{ color: colors["--clr-gray-1"] }}
          >
            Sign in to your account
          </Typography>

          <form onSubmit={handleLogin}>
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
                borderRadius: 2,
                bgcolor: colors["--clr-yellow-1"],
                color: "#000",
                fontWeight: 600,
                "&:hover": { bgcolor: colors["--clr-yellow-2"] },
              }}
            >
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              borderColor: colors["--clr-gray-7"],
              color: colors["--clr-gray-3"],
              "&:hover": {
                borderColor: colors["--clr-gray-6"],
                backgroundColor: colors["--clr-white-5"],
              },
            }}
          >
            Sign in with Google
          </Button>

          <Typography variant="body2" textAlign="center" mt={3}>
            Don't have an account?{" "}
            <Link href="/register" underline="hover" sx={{ fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
