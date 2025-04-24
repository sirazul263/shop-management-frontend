import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Current Password must be at least 8 characters")
      .max(256, "Current Password must be at best 256 characters"),
    new_password: z
      .string()
      .min(8, "New Password must be at least 8 characters")
      .max(256, "New Password must be at best 256 characters"),
    new_password_confirmation: z
      .string()
      .min(8, "New Password must be at least 8 characters")
      .max(256, "New Password must be at best 256 characters"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["confirm_new_password"],
    message: "Passwords do not match",
  })
  .refine((data) => data.new_password !== data.current_password, {
    path: ["new_password"],
    message: "New password must be different from current password",
  });
