import * as z from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
});
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Password is required",
    }),
    newPassword: z.string().min(6, {
      message: "New Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine(
    (data) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(data.newPassword),
    {
      message:
        "Password must contain at least 1 lowercase, 1 uppercase letter, and 1 numeric character",
      path: ["newPassword"],
    }
  )
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;
