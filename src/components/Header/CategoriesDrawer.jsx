import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig'; 
import { signOut } from 'firebase/auth';
import { 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Divider, 
  Box,
  IconButton,
  Typography,
  Avatar
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import Logo from "./Logo";
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import colors from "../../theme/colors";

export default function CategoriesDrawer({ onCategorySelect }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const { data: categories, loading, error } = useFetch(
    'https://fakestoreapi.com/products/categories'
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategorySelect = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    handleClose();
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const firstName = displayName.split(' ')[0];

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="open categories"
        sx={{
          color: 'white',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              bgcolor: colors["--clr-white-4"],
              color: colors["--clr-blue-gray-1"],
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            bgcolor: colors["--clr-black-4"],
            borderBottom: `3px solid ${colors["--clr-yellow-3"]}`,
          }}
        >
          <Logo />

          <IconButton
            onClick={handleClose}
            sx={{
              color: colors["--clr-white-1"],
              '&:hover': {
                bgcolor: colors["--clr-gray-2"],
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 2.5,
            bgcolor: colors["--clr-white-1"],
            borderBottom: `1px solid ${colors["--clr-white-7"]}`,
          }}
        >
          {user ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={user.photoURL}
                  sx={{
                    bgcolor: colors["--clr-yellow-3"],
                    color: colors["--clr-blue-gray-1"],
                    width: 48,
                    height: 48,
                    fontWeight: 700,
                  }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: colors["--clr-gray-5"], fontSize: '0.875rem' }}>
                    Hello,
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: colors["--clr-blue-gray-1"], fontWeight: 600 }}>
                    {firstName}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderColor: colors["--clr-gray-7"],
                  color: colors["--clr-blue-gray-1"],
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: colors["--clr-blue-gray-1"],
                    bgcolor: colors["--clr-white-4"],
                  },
                }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: colors["--clr-blue-gray-1"], mb: 0.5 }}>
                Welcome! Access your account
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  bgcolor: colors["--clr-yellow-1"],
                  color: colors["--clr-blue-gray-1"],
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: colors["--clr-yellow-2"],
                    boxShadow: 'none',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleRegister}
                sx={{
                  borderColor: colors["--clr-gray-7"],
                  color: colors["--clr-blue-gray-1"],
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: colors["--clr-gray-6"],
                    bgcolor: colors["--clr-white-2"],
                  },
                }}
              >
                Create account
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: colors["--clr-blue-gray-1"],
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.75rem',
              }}
            >
              Categories
            </Typography>
          </Box>

          {loading && <Loading text="Loading..." />}

          {error && (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" sx={{ color: colors["--clr-yellow-2"] }}>
                Error loading categories
              </Typography>
            </Box>
          )}

          {!loading && !error && categories?.length > 0 ? (
            <List sx={{ pt: 0 }}>
              {categories.map((category, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleCategorySelect(category)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderLeft: '3px solid transparent',
                      '&:hover': {
                        bgcolor: colors["--clr-white-7"],
                        borderLeft: `3px solid ${colors["--clr-yellow-1"]}`,
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <ListItemText
                      primary={formatCategory(category)}
                      slotProps={{
                        primary: {
                          sx: {
                            color: colors["--clr-blue-gray-1"],
                            fontWeight: 500,
                            fontSize: '0.9375rem',
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            !loading && !error && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ color: colors["--clr-gray-6"] }}>
                  No categories found
                </Typography>
              </Box>
            )
          )}
        </Box>

        <Divider sx={{ borderColor: colors["--clr-white-7"] }} />
        <Box
          sx={{
            p: 2,
            bgcolor: colors["--clr-white-4"],
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: colors["--clr-blue-gray-1"] }}>
            © 2025 BuyIt - All rights reserved
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}