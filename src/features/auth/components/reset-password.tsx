"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { useResetPassword } from "../api/use-reset-password";
import { useRouter, useSearchParams } from "next/navigation";
const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [submitted, setSubmitted] = useState<boolean>(false);
  const { mutateAsync, isPending } = useResetPassword();
  const [error, setError] = useState<string | null>(null);
  const schema = z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one digit"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const finalValues = {
        email: email,
        token: token,
        new_password: values.password,
        new_password_confirmation: values.confirmPassword,
      };
      setError(null);
      const res = await mutateAsync(finalValues);
      if (res.status === 1) {
        setSubmitted(true);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(getErrorMessage(error.response.data));
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Card className="border md:min-w-[480px] shadow-none">
      <CardHeader className="flex items-center justify-center text-center px-7">
        <CardTitle className="text-2xl">Reset Password!</CardTitle>
      </CardHeader>

      <CardContent className="px-7">
        {submitted ? (
          <div>
            <div className="gap-3 p-4 border border-green-300 bg-green-50 rounded-md max-w-md mx-auto">
              {/* Success Icon */}
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />

              {/* Message */}
              <div className="flex-1">
                <p className="font-semibold text-green-700">
                  You password has been reset successfully!
                </p>
                <p className="text-green-700 text-sm">
                  Please sign in to Continue.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Password <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm New Password{" "}
                      <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="flex items-center">
                  <AlertTriangle className="size-5 text-red-700 mr-2" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
export default ResetPassword;
