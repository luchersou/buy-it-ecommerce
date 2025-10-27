import { z } from "zod";
import { luhnCheck } from "../utils/validators";

export const baseSchema = z.object({
  fullName: z.string().min(3, "Name must have at least 3 characters"),
  email: z.email("Invalid email"),
  phone: z
    .string()
    .regex(/^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/, "Invalid phone number (e.g. (11) 98765-4321)"),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "Invalid ZIP code (e.g. 12345-678)"),
  address: z.string().min(5, "Address must have at least 5 characters"),
  number: z.string().min(1, "Number is required"),
  complement: z.string().optional(),
  city: z.string().min(2, "City must have at least 2 characters"),
  state: z.string().length(2, "State must have 2 letters (e.g. SP)").toUpperCase(),
  paymentMethod: z.enum(["credit-card", "debit-card", "pix", "boleto"]),
});

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must have 16 digits")
    .refine(luhnCheck, "Invalid card number"),
  cardName: z.string().min(3, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid date (format MM/YY)")
    .refine((date) => {
      const [month, year] = date.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, "Card has expired"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must have 3 or 4 digits"),
});
