import { Badge, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../contexts/CartContext"; 
import { useNavigate } from "react-router-dom";
import colors from "../../theme/colors";

function CartButton() {
  const { itemCount } = useCart(); 
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/cart"); 
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        px: 2,
        py: 0.5,
        borderRadius: 10,
        cursor: "pointer",
        "&:hover": {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Badge badgeContent={itemCount} color="error">
        <AddShoppingCartIcon sx={{ color: colors["--clr-white-1"] }} />
      </Badge>
    </Box>
  );
}

export default CartButton;
