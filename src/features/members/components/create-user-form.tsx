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
import { AlertTriangle } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useCreateUser } from "../api/use-create-user";
import { useCreateUserModal } from "../hooks/use-create-user-modal";
import { createUserSchema } from "../schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetStores } from "@/features/store/api/use-get-stores";
import { Store } from "@/features/store/types";
import { DefaultAvatar } from "@/components/default-avatar";

interface CreateUserFormPros {
  onCancel?: () => void;
}
export const CreateUserForm = ({ onCancel }: CreateUserFormPros) => {
  const router = useRouter();
  const { data: stores } = useGetStores();
  const storeOptions = stores
    ? stores?.data.map((store: Store) => ({
        id: store.id,
        name: store.name,
      }))
    : [];

  const { mutateAsync, isPending } = useCreateUser();
  const { close } = useCreateUserModal();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      store_id: "",
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
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
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="store_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Store <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Store" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {storeOptions.map((option: Store) => (
                          <SelectItem key={option.id} value={`${option.id}`}>
                            <div className="flex items-center gap-x-2">
                              <DefaultAvatar
                                className="size-6"
                                name={option.name}
                              />
                              {option.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Enter email"
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
                      Password <span className="text-red-700">*</span>{" "}
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
              />{" "}
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
                  "Create User"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
