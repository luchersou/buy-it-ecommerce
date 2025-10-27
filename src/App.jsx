import { Box } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider  } from "./contexts/AuthContext";
import colors from "./theme/colors";

function App() {
  return (
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              background: colors["--clr-gradient-background"]
            }}
          >
            <Header />
            <Box sx={{ flex: 1 }}>
              <AppRoutes />
            </Box>
            <Footer />
          </Box>
        </CartProvider>
      </AuthProvider>
  );
}

export default App;
