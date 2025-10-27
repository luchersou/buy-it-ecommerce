import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function AddressForm({ form }) {
  const { control, formState: { errors } } = form;

  return (
    <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
      <Controller name="zipCode" control={control} render={({ field }) => (
        <TextField {...field} fullWidth label="zipCode" placeholder="12345-678" error={!!errors.zipCode} helperText={errors.zipCode?.message} />
      )}/>
      <Controller name="address" control={control} render={({ field }) => (
        <TextField {...field} fullWidth label="address" error={!!errors.address} helperText={errors.address?.message} />
      )}/>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" }, gap: 2 }}>
        <Controller name="number" control={control} render={({ field }) => (
          <TextField {...field} label="number" error={!!errors.number} helperText={errors.number?.message} />
        )}/>
        <Controller name="complement" control={control} render={({ field }) => (
          <TextField {...field} label="complement" error={!!errors.complement} helperText={errors.complement?.message} />
        )}/>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" }, gap: 2 }}>
        <Controller name="city" control={control} render={({ field }) => (
          <TextField {...field} label="city" error={!!errors.city} helperText={errors.city?.message} />
        )}/>
        <Controller name="state" control={control} render={({ field }) => (
          <TextField {...field} label="state" placeholder="SP" slotProps={{ htmlInput: { maxLength: 2, style: { textTransform: "uppercase" } } }} error={!!errors.state} helperText={errors.state?.message} />
        )}/>
      </Box>
    </Box>
  );
}
