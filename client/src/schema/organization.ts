import * as z from "zod";

export const UpdateBillingInformationSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  zipCode: z.string().min(1, {
    message: "Zip code is required",
  }),
  vatNumber: z.string(),
  vatCountry: z.string(),
});

export type UpdateBillingInformationFormValues = z.infer<
  typeof UpdateBillingInformationSchema
>;
