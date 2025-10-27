import { Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import colors from "../../theme/colors";

function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Box
          sx={{
            bgcolor: colors["--clr-yellow-1"],
            borderRadius: '8px',
            p: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: colors["--clr-shadow-logo"],
          }}
        >
          <ShoppingCartIcon
            sx={{
              color: colors["--clr-black-1"],
              fontSize: { xs: 22, sm: 26, md: 28 },
            }}
          />
        </Box>

        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 800,
            color: colors["--clr-yellow-1"],
            fontFamily: '"Poppins", "Roboto", sans-serif',
            letterSpacing: '-0.5px',
            textShadow: colors["--clr-shadow-default"],
            fontSize: { xs: "1.0rem", sm: "1.2rem", md: "1.7rem" },
            '&:hover': {
              color: colors["--clr-yellow-2"],
            },
          }}
        >
          Buy
          <Box
            component="span"
            sx={{
              color: colors["--clr-white-1"],
              fontWeight: 700,
            }}
          >
            It
          </Box>
        </Typography>
      </Box>
    </Link>
  );
}

export default Logo;