import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import SearchBar from '../searchbar/SearchBar';
import AccountMenu from "./AccountMenu";
import CartButton from "./CartButton";
import CategoriesDrawer from "./CategoriesDrawer";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/colors";

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: categories = [],
    loading,
    error,
  } = useFetch("https://fakestoreapi.com/products/categories");

  const handleCategorySelect = (category) => {
    navigate(`/products/category/${category}`);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: colors["--clr-black-4"],
        boxShadow: colors["--clr-shadow-default"],
        py: { xs: 1, md: 0 },
      }}
    >
      {isSmallScreen ? (
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CategoriesDrawer onCategorySelect={handleCategorySelect}>
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              </CategoriesDrawer>
              <Logo />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CartButton />
              <AccountMenu />
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <SearchBar
              categories={categories}
              loading={loading}
              error={error}
            />
          </Box>
        </Toolbar>
      ) : (
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CategoriesDrawer onCategorySelect={handleCategorySelect} />
            <Logo />
          </Box>

          <Box sx={{ flex: 1, maxWidth: 600 }}>
            <SearchBar
              categories={categories}
              loading={loading}
              error={error}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CartButton />
            <AccountMenu />
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}

export default Header;
