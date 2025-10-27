import { Paper, Typography, Divider, Button } from "@mui/material";
import PersonalDataForm from "./PersonalDataForm";
import AddressForm from "./AddressForm";
import PaymentSection from "./PaymentSection";
import Loading from "../Loading";
import colors from "../../theme/colors";

export default function CheckoutForm({ form, onSubmit, loading, paymentMethod, setPaymentMethod }) {
  const { handleSubmit } = form;

  return (
    <Paper elevation={0} sx={{ p: 3, border: `1px solid ${colors["--clr-gray-9"]}`, flex: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Personal Information
        </Typography>
        <PersonalDataForm form={form} />

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight={600} mb={2}>
          Shipping Address
        </Typography>
        <AddressForm form={form} />

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight={600} mb={2}>
          Payment Method
        </Typography>
        <PaymentSection
          form={form}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            mt: 3,
            bgcolor: colors["--clr-yellow-3"],
            color: colors["--clr-black-1"],
            fontWeight: 600,
            py: 1.5,
            "&:hover": { bgcolor: colors["--clr-yellow-4"] },
          }}
        >
          {loading ? <Loading text="Loading..."/> : "CONFIRM ORDER"}
        </Button>
      </form>
    </Paper>
  );
}
