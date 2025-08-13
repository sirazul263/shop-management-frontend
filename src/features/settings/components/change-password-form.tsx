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
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useChangePasswordModal } from "../hooks/use-change-password-modal";
import { changePasswordSchema } from "../schemas";
import { useChangePassword } from "../api/use-change-password";

interface ChangePasswordFormPros {
  onCancel?: () => void;
}
export const ChangePasswordForm = ({ onCancel }: ChangePasswordFormPros) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] =
    useState<boolean>(false);

  const { mutateAsync, isPending } = useChangePassword();
  const { close } = useChangePasswordModal();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      setError(null);
      await mutateAsync(values);
      router.refresh();
      close();
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
        <CardTitle className="text-xl font-bold">
          Create a new supplier
        </CardTitle>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-y-4">
              <FormField
                name="current_password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Password <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
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
              <FormField
                name="new_password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Password <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? (
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
              <FormField
                name="new_password_confirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Confirm Password{" "}
                      <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewConfirmPassword ? "text" : "password"}
                          placeholder="Enter confirm new password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowNewConfirmPassword((prev) => !prev)
                          }
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showNewConfirmPassword ? (
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
            </div>

            <DottedSeparator className="py-3" />
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
      </CardContent>
    </Card>
  );
};
