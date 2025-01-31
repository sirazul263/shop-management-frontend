"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ImageIcon } from "lucide-react";
import { createProductSchema } from "../schemas";
import { DefaultAvatar } from "@/components/default-avatar";
import { uploadImage } from "@/hooks/upload-image";
import { getErrorMessage } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "../types";
import { useUpdateProduct } from "../api/use-update-product";
import { useStoreId } from "@/hooks/use-store-id";

interface UpdateProductFormProps {
  initialValue: Product;
  categoryOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  brandOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
}

export const UpdateProductForm = ({
  initialValue,
  categoryOptions,
  brandOptions,
}: UpdateProductFormProps) => {
  const router = useRouter();
  const storeId = useStoreId();
  const { mutateAsync, isPending } = useUpdateProduct();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      categoryId: `${initialValue.category_id}`,
      brandId: `${initialValue.brand_id}`,
      name: initialValue.name,
      price: initialValue.price,
      description: initialValue.description ?? "",
      image: initialValue.image ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    let image = values.image;
    if (values.image && values.image instanceof File) {
      setUploading(true);
      const uploadedImage = await uploadImage(values.image);
      if (uploadedImage) {
        image = uploadedImage.url;
      }
      setUploading(false);
    }
    const finalValue = {
      store_id: storeId,
      id: initialValue.id,
      category_id: values.categoryId,
      brand_id: values.brandId,
      name: values.name,
      price: Number(values.price),
      description: values.description,
      image: image || "",
    };
    try {
      setError(null);
      const res = await mutateAsync(finalValue);
      router.push(`/${storeId}/products`);
    } catch (error: any) {
      setError(getErrorMessage(error.response.data));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="w-full h-full  border-none shadow-none">
      <div className="px-7 pb-5">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="categoryId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
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
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="brandId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brand <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brandOptions.map((option) => (
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
              </div>
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
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter product name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-4">
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Price <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter price"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter description"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4 mt-5">
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              fill
                              className="object-cover"
                              alt="Image"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col ">
                          <p className="text-sm">Product Image</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG,SVG or JPEG, , max 1MB
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg, .png, .svg, .jpeg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>

            <DottedSeparator className="py-5" />

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
                variant="destructive"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending || uploading}>
                {isPending || uploading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
