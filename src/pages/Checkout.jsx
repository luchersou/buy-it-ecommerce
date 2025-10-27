// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Typography, Paper, Button, Alert } from "@mui/material";
import Wrapper from "../components/layout/Wrapper";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import { baseSchema, cardSchema } from "../schemas/checkoutSchema";
import { defaultCheckoutValues } from "../schemas/defaultCheckoutValues";
import { useCart } from "../contexts/CartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import colors from "../theme/colors";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, total: subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const checkoutSchema =
    paymentMethod === "credit-card" || paymentMethod === "debit-card"
      ? z.intersection(baseSchema, cardSchema)
      : baseSchema;

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: defaultCheckoutValues,
  });

  const { reset } = form;

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset(); 
      alert("Simulated payment successful! Thank you for your purchase 😊");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <Wrapper>
        <Box sx={{ maxWidth: "1400px", mx: "auto", p: 2, minHeight: "60vh" }}>
          <Alert severity="info" sx={{ mt: 4 }}>
            Your cart is empty. Add products to complete your purchase.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            sx={{
              mt: 2,
              bgcolor: colors["--clr-yellow-3"],
              color: colors["--clr-black-1"],
              "&:hover": { bgcolor: colors["--clr-yellow-4"] },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Wrapper>
    );
  }

  const shipping = 25.0;
  const total = subtotal + shipping;

  return (
    <Wrapper>
      <Box sx={{ maxWidth: "1400px", mx: "auto", p: 2 }}>
        <BreadcrumbsNav
          items={[
            { label: "Cart", to: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <Typography variant="h4" fontWeight={600} mb={4} mt={2}>
          Complete Your Order
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <CheckoutForm
            form={form}
            onSubmit={onSubmit}
            loading={loading}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </Box>
      </Box>
    </Wrapper>
  );
}
