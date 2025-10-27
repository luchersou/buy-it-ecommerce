// src/components/checkout/PersonalDataForm.jsx
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function PersonalDataForm({ form }) {
  const { control, formState: { errors } } = form;

  return (
    <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth label="Full Name" error={!!errors.fullName} helperText={errors.fullName?.message} />
        )}
      />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="E-mail" type="email" error={!!errors.email} helperText={errors.email?.message} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Phone Number" placeholder="(11) 98765-4321" error={!!errors.phone} helperText={errors.phone?.message} />
          )}
        />
      </Box>
    </Box>
  );
}
