"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { useForgotPassword } from "../api/use-forgot-password";

interface ForgotPasswordFormPros {
  onCancel?: () => void;
}

export const ForgotPasswordForm = ({ onCancel }: ForgotPasswordFormPros) => {
  const { mutateAsync, isPending } = useForgotPassword();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const schema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setError(null);
      const res = await mutateAsync(values);
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
    <Card className="w-full h-full  border-none shadow-none">
      <CardHeader className="flex pb-3 pt-0 px-7">
        <CardTitle className="text-xl font-bold">Forgot Password</CardTitle>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-3">
        {submitted ? (
          <div>
            <div className="gap-3 p-4 border border-green-300 bg-green-50 rounded-md max-w-md mx-auto">
              {/* Success Icon */}
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />

              {/* Message */}
              <div className="flex-1">
                <p className="font-semibold text-green-700">
                  A password reset link has been sent to your email!
                </p>
                <p className="text-green-700 text-sm">
                  Please verify and reset your password.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button onClick={onCancel}>Continue</Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <div className="flex items-center">
                  <AlertTriangle className="size-5 text-red-700 mr-2" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
