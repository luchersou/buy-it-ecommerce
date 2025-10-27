// src/components/checkout/PaymentSection.jsx
import {
  Box, RadioGroup, Radio, FormControlLabel, FormControl, TextField, Alert
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function PaymentSection({ form, paymentMethod, setPaymentMethod }) {
  const { control, formState: { errors }, setValue } = form;

  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
    setValue("paymentMethod", value);
  };

  return (
    <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            value={paymentMethod}
            onChange={(e) => handlePaymentChange(e.target.value)}
          >
            <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="debit-card" control={<Radio />} label="Debit Card" />
            <FormControlLabel value="pix" control={<Radio />} label="PIX" />
            <FormControlLabel value="boleto" control={<Radio />} label="Boleto" />
          </RadioGroup>
        )}
      />

      {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
        <Box sx={{ display: "grid", gap: 2, width: '100%' }}>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Card Number" 
                placeholder="1234567890123456" 
                error={!!errors.cardNumber} 
                helperText={errors.cardNumber?.message} 
                slotProps={{ 
                  htmlInput: { maxLength: 16 } 
                }}
              />
            )}
          />
          <Controller
            name="cardName"
            control={control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Name on Card" 
                error={!!errors.cardName} 
                helperText={errors.cardName?.message} 
              />
            )}
          />
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, 
            gap: 2 
          }}>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  fullWidth
                  label="Expiry Date" 
                  placeholder="MM/AA" 
                  error={!!errors.expiryDate} 
                  helperText={errors.expiryDate?.message} 
                  slotProps={{ 
                    htmlInput: { maxLength: 5 } 
                  }}
                />
              )}
            />
            <Controller
              name="cvv"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  fullWidth
                  label="CVV" 
                  placeholder="123" 
                  error={!!errors.cvv} 
                  helperText={errors.cvv?.message} 
                  slotProps={{ 
                    htmlInput: { maxLength: 4 } 
                  }}
                />
              )}
            />
          </Box>
        </Box>
      )}

      {paymentMethod === "pix" && (
        <Alert severity="info" sx={{ width: '100%' }}>
          After confirming the order, you will receive a PIX code for payment.
        </Alert>
      )}
      {paymentMethod === "boleto" && (
        <Alert severity="info" sx={{ width: '100%' }}>
          The boleto will be generated and sent via email after order confirmation.
        </Alert>
      )}
    </FormControl>
  );
}