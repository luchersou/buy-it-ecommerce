import { Paper, Typography, Box, Divider } from "@mui/material";
import { useResponsiveTruncate } from "../../hooks/useResponsiveTruncate";
import colors from "../../theme/colors";

export default function OrderSummary({ cartItems, subtotal, shipping, total }) {
  const truncate = useResponsiveTruncate(40, 50, 65);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${colors["--clr-gray-9"]}`,
        position: "sticky",
        top: 80,
        flex: 1,
        alignSelf: "flex-start",     
        height: "fit-content",       
        overflow: "visible",         
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>Order Summary</Typography>

      <Box sx={{ mb: 2 }}>
        {cartItems.map((item) => (
          <Box key={item.id} sx={{ display: "flex", gap: 2, mb: 2 }}>
            <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                {truncate(item.title)}
              </Typography>
              <Typography variant="body2" color={colors["--clr-gray-5"]}>Qtd: {item.quantity}</Typography>
              <Typography variant="body2" fontWeight={600}>$ {(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">$ {subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2">$ {shipping.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>Total</Typography>
        <Typography variant="h6" fontWeight={700} color={colors["--clr-gray-2"]}>$ {total.toFixed(2)}</Typography>
      </Box>
    </Paper>
  );
}