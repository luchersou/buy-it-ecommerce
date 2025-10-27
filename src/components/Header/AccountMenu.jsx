import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  KeyboardArrowDown,
  Person,
  ShoppingBag,
  FavoriteBorder,
  Logout,
  Settings,
} from "@mui/icons-material";
import colors from "../../theme/colors";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (!user) {
    return (
      <>
        <Button
          startIcon={<AccountCircle sx={{ fontSize: { xs: 20, sm: 24 } }} />}
          endIcon={<KeyboardArrowDown sx={{ fontSize: { xs: 16, sm: 20 } }} />}
          onClick={handleClick}
          sx={{
            color: "white",
            textTransform: "none",
            border: "1px solid transparent",
            minWidth: { xs: "auto" },
            px: { xs: 1, sm: 1.5 },
            transition: "transform 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.08)", },
          }}
        >
          <Box sx={{ textAlign: "left", ml: 0.5 }}>
            <Typography
              variant="caption"
              display="block"
              sx={{
                color: colors["--clr-gray-7"],
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              Hello, visitor!
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Sign In
            </Typography>
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          slotProps={{ 
            paper: { 
              sx: {
                minWidth: { xs: "200px", sm: "240px" },
              },
            },
          }}
        >
          <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavigate("/login")}
              sx={{
                bgcolor: colors["--clr-yellow-1"],
                color: colors["--clr-black-3"],
                fontWeight: "bold",
                mb: 1,
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                "&:hover": { bgcolor: colors["--clr-yellow-2"] },
              }}
            >
              SIGN IN
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleNavigate("/register")}
              sx={{
                color: colors["--clr-blue-gray-1"],
                borderColor: colors["--clr-gray-8"],
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                "&:hover": { borderColor: colors["--clr-white-8"], bgcolor: colors["--clr-white-2"] },
              }}
            >
              SIGN UP
            </Button>
          </Box>
        </Menu>
      </>
    );
  }

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const firstName = displayName.split(" ")[0];

  return (
    <>
      <Button
        startIcon={
          <Avatar
            src={user.photoURL}
            alt={displayName}
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        }
        endIcon={<KeyboardArrowDown sx={{ fontSize: { xs: 16, sm: 20 } }} />}
        onClick={handleClick}
        sx={{
          color: "white",
          textTransform: "none",
          border: "1px solid transparent",
          minWidth: { xs: "auto" },
          px: { xs: 1, sm: 1.5 },
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.08)", },
        }}
      >
        <Box sx={{ textAlign: "left", ml: 0.5 }}>
          <Typography
            variant="caption"
            display="block"
            sx={{ color: colors["--clr-gray-7"], fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
          >
            Hello, {firstName}
          </Typography>
          <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
            Account & Lists
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        slotProps={{ 
          paper: { 
            sx: {
              minWidth: { xs: "200px", sm: "240px" },
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, bgcolor: colors["--clr-white-2"] }}>
          <Typography variant="body2" fontWeight="bold" color={colors["--clr-black-1"]}>
            {displayName}
          </Typography>
          <Typography variant="caption" color={colors["--clr-gray-3"]}>
            {user.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>

        <MenuItem >
          <ListItemIcon>
            <ShoppingBag fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Orders</ListItemText>
        </MenuItem>

        <MenuItem >
          <ListItemIcon>
            <FavoriteBorder fontSize="small" />
          </ListItemIcon>
          <ListItemText>Wish List</ListItemText>
        </MenuItem>

        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
