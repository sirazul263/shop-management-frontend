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

import { DottedSeparator } from "@/components/dotted-separator";
import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../api/use-login";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import ForgotPasswordModal from "./forgot-password-modal";

export const SignInCard = () => {
  const { mutateAsync, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, "Password must be at least 1 characters")
      .max(256, "Password must be at best 256 characters"),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setError(null);
      await mutateAsync(values);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(getErrorMessage(error.response.data));
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back !</CardTitle>
        <p>Amirul Telecom</p>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-900">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center mb-6">
              <Checkbox label={"Remember me"} defaultChecked />
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-gray-500 font-normal"
                onClick={() => setShowForgetPassword(true)}
              >
                Forgot password?
              </Button>
            </div>

            {error && (
              <div className="flex items-center">
                <AlertTriangle className="size-5 text-red-700 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full "
              disabled={isPending}
            >
              {isPending ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {showForgetPassword && (
        <ForgotPasswordModal
          show={showForgetPassword}
          setShow={setShowForgetPassword}
        />
      )}
    </Card>
  );
};
