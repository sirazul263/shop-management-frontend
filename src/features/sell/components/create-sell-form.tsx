"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, InfoIcon } from "lucide-react";
import { customStyles, getErrorMessage, numberWithCommas } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/features/products/types";
import Select2 from "react-select";
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateSell } from "../api/use-create-sell";
import { createSellSchema } from "../schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductDetails } from "./product-details";
import { useStoreId } from "@/hooks/use-store-id";

interface CreateSellFormProps {
  products: Product[];
}
export const CreateSellForm = ({ products }: CreateSellFormProps) => {
  const router = useRouter();
  const storeId = useStoreId();
  const { mutateAsync, isPending } = useCreateSell();
  const [discountAmount, setDiscountAmount] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createSellSchema>>({
    resolver: zodResolver(createSellSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      products: [],
      discount_type: "",
      discount_amount: 0,
      total_discount: 0,
      total_paid: 0,
      due: 0,
      payment_method: "CASH",
      payment_status: "PAID",
      notes: "",
    },
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });
  const selectedProducts = form.watch("products");
  // Function to handle product selection
  const handleProductChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions || [];

    // Assuming you have a `products` array that contains product details, including price
    const existingProductIds = selectedProducts.map((product) => product.id);

    // Add new products with default price from `products` array
    const newProducts = selectedValues
      .filter((option: any) => !existingProductIds.includes(option.value))
      .map((option: any) => {
        // Find the product details from the original products array
        const productDetails = products.find(
          (product) => product.id == option.value
        );
        return {
          id: option.value,
          name: option.label,
          quantity: 1,
          unit_amount: productDetails ? Number(productDetails.sell_price) : 0, // Default price
          total_amount: productDetails ? Number(productDetails.sell_price) : 0,
        };
      });

    // Sync table rows with selected products
    const updatedProducts = [
      ...selectedProducts.filter((product) =>
        selectedValues.find((option: any) => option.value === product.id)
      ),
      ...newProducts,
    ];

    // Update form state
    form.setValue("products", updatedProducts);
  };

  const onSubmit = async (values: z.infer<typeof createSellSchema>) => {
    const finalProducts = [];
    for (let i = 0; i < values.products.length; i++) {
      finalProducts.push({
        id: values.products[i].id,
        quantity: values.products[i].quantity,
        unit_amount: values.products[i].unit_amount,
      });
    }
    const finalValue = {
      store_id: storeId,
      name: values.name,
      phone: `880${values.phone}`,
      address: values.address,
      discount_type: values.discount_type,
      discount_amount: values.discount_amount,
      payment_method: values.payment_method,
      payment_status: values.payment_status,
      total_paid: values.total_paid,
      notes: values.notes,
      products: finalProducts,
    };

    try {
      setError(null);
      const res = await mutateAsync(finalValue);
      router.push(`/${storeId}/sells`);
    } catch (error: any) {
      setError(getErrorMessage(error.response.data));
    }
  };

  const productOptions: { value: string; label: string }[] = [];
  products.forEach((product) => {
    if (product.quantity > 0) {
      productOptions.push({
        value: `${product.id}`,
        label: `${product.brand.name} ${product.name}`,
      });
    }
  });
  //Calculate the total price
  let total = 0;
  selectedProducts.forEach((product) => {
    total += product.quantity * product.unit_amount;
  });

  const getProductById = (productId: number) => {
    console.log(productId);
    return products.find((product) => product.id === productId);
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <div className="px-7 pb-2">
        <DottedSeparator className="pb-0" />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-12  gap-4">
              <div className="col-span-7 flex flex-col justify-center gap-y-4">
                <div className="grid md:grid-cols-12  gap-4">
                  <div className="col-span-7">
                    <FormLabel>
                      Products <span className="text-red-700">*</span>
                    </FormLabel>
                    <Select2
                      options={productOptions}
                      styles={customStyles}
                      value={productOptions.filter((option) =>
                        selectedProducts.some(
                          (product) => product.id === option.value
                        )
                      )}
                      onChange={handleProductChange}
                      placeholder="Select products"
                      isClearable
                      isMulti
                    />
                  </div>
                  <div className="col-span-4 ">
                    <div
                      className="flex items-center  cursor-pointer pt-10"
                      onClick={() => router.push("/products/create")}
                    >
                      <p className="text-xs uppercase font-bold text-neutral-500 ">
                        Add Product
                      </p>
                      <RiAddCircleFill className="size-5 ms-2 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 flex flex-col justify-center gap-y-4">
                <div className="text-end mt-3">
                  <p className="font-semibold text-sm ">
                    Total Items : {selectedProducts.length}
                  </p>
                  <p className="font-semibold text-sm ">
                    Net Total Amount : ৳ {numberWithCommas(total)}
                  </p>
                </div>
              </div>
            </div>
            {/* Dynamic Products Table */}
            {selectedProducts.length > 0 && (
              <div className="mt-4">
                <table className="min-w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">Product Name</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Unit Price</th>
                      <th className="px-4 py-2 border">Total Price</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id}>
                        <td className="px-4  border">
                          <div className="flex items-center">
                            <p className="line-clamp-1 pe-2">{field.name}</p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" className="px-0">
                                  <InfoIcon className="size-5" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <ProductDetails
                                  product={getProductById(
                                    Number(selectedProducts[index].id)
                                  )}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </td>
                        <td className="px-4 py-2 border">
                          <FormField
                            name={`products.${index}.quantity`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter quantity"
                                    {...form.register(
                                      `products.${index}.quantity`,
                                      {
                                        valueAsNumber: true, // Converts the input value to a number
                                      }
                                    )}
                                    onChange={(e) => {
                                      const quantity =
                                        parseFloat(e.target.value) || 0;
                                      form.setValue(
                                        `products.${index}.quantity`,
                                        quantity
                                      );
                                      const unit_amount = form.getValues(
                                        `products.${index}.unit_amount`
                                      );
                                      form.setValue(
                                        `products.${index}.total_amount`,
                                        quantity * unit_amount
                                      );
                                    }}
                                    onWheel={(e) => e.currentTarget.blur()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <FormField
                            name={`products.${index}.unit_amount`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter unit amount"
                                    {...form.register(
                                      `products.${index}.unit_amount`,
                                      {
                                        valueAsNumber: true, // Converts the input value to a number
                                        setValueAs: (value) =>
                                          value === "" ? 0 : value,
                                      }
                                    )}
                                    onChange={(e) => {
                                      const newPrice =
                                        parseFloat(e.target.value) || 0;
                                      form.setValue(
                                        `products.${index}.unit_amount`,
                                        newPrice
                                      );
                                      const quantity = form.getValues(
                                        `products.${index}.quantity`
                                      );
                                      form.setValue(
                                        `products.${index}.total_amount`,
                                        newPrice * quantity
                                      );
                                    }}
                                    onWheel={(e) => e.currentTarget.blur()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <FormField
                            name={`products.${index}.total_amount`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="0"
                                    {...form.register(
                                      `products.${index}.total_amount`,
                                      {
                                        valueAsNumber: true, // Converts the input value to a number
                                        setValueAs: (value) =>
                                          value === "" ? 0 : value,
                                      }
                                    )}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <DottedSeparator className="py-3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Customer Name <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter customer name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Customer Phone <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <div className="flex items-center border rounded-md">
                        <span className="ps-3  text-gray-700 font-medium">
                          +880
                        </span>
                        <FormControl className="border-none focus:outline-none focus:ring-0">
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter phone"
                            className="border-none focus:outline-none focus:ring-0"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Customer Address <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DottedSeparator className="py-3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="discount_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          const discount =
                            form.getValues("discount_amount") || 0;
                          let discountAmount = 0;
                          if (value) {
                            if (value === "FIXED") {
                              discountAmount = discount;
                            } else if (value === "PERCENTAGE") {
                              discountAmount = (total * discount) / 100;
                            }
                          }
                          form.setValue("discount_type", value);
                          form.setValue("total_discount", discountAmount);
                          setDiscountAmount(discountAmount);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FIXED">Fixed</SelectItem>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-4">
                <FormField
                  name="discount_amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter discount amount"
                          {...form.register(`discount_amount`, {
                            valueAsNumber: true, // Converts the input value to a number
                          })}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value) || 0;
                            const discount =
                              form.getValues("discount_amount") || 0;
                            const discountType =
                              form.getValues("discount_type");

                            let discountAmount = 0;
                            if (discountType) {
                              if (discountType === "FIXED") {
                                discountAmount = newValue;
                              } else if (discountType === "PERCENTAGE") {
                                discountAmount = (total * discount) / 100;
                              }
                            }
                            form.setValue("discount_amount", newValue);
                            form.setValue("total_discount", discountAmount);
                            setDiscountAmount(discountAmount);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="total_discount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Discount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter discount amount"
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-y-4">
                <FormLabel>
                  Total Sell <span className="text-red-700">*</span>{" "}
                </FormLabel>
                <Input
                  type="number"
                  placeholder="Enter total sell"
                  value={total - discountAmount}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="total_paid"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Total Paid <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter total paid"
                          {...form.register(`total_paid`, {
                            valueAsNumber: true, // Converts the input value to a number
                          })}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value) || 0;
                            form.setValue("total_paid", newValue);
                            form.setValue(
                              "due",
                              total - discountAmount - newValue
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="due"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Total Due <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter total due"
                          {...form.register(`due`, {
                            valueAsNumber: true, // Converts the input value to a number
                          })}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DottedSeparator className="py-3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="payment_method"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Payment Method <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CASH">Cash</SelectItem>
                          <SelectItem value="CARD">Card</SelectItem>
                          <SelectItem value="CHEQUE">Cheque</SelectItem>
                          <SelectItem value="BANK">Bank Transfer</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="payment_status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Payment Status <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PAID">Paid</SelectItem>
                          <SelectItem value="DUE">Due</SelectItem>
                          <SelectItem value="UNPAID">Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="notes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter notes"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="my-3">
              <DottedSeparator />
            </div>
            {error && (
              <div className="flex items-center mb-3 text-center">
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
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  "Add Sale"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
