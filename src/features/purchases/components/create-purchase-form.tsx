"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, InfoIcon } from "lucide-react";

import { customStyles, getErrorMessage, numberWithCommas } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { createPurchaseSchema } from "../schemas";
import { useCreatePurchase } from "../api/use-create-purchase";
import { Supplier } from "@/features/suppliers/types";
import { Product } from "@/features/products/types";
import Select2, { MultiValue } from "react-select";

import { RiAddCircleFill } from "react-icons/ri";
import { useCreateSupplierModal } from "@/features/suppliers/hooks/use-create-supplier-modal";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { DatePicker } from "@/components/date-picker";
import { useStoreId } from "@/hooks/use-store-id";
import { AxiosError } from "axios";

interface CreatePurchaseFormProps {
  suppliers: Supplier[];
  products: Product[];
}
interface OptionType {
  value: string;
  label: string;
}

export const CreatePurchaseForm = ({
  products,
  suppliers,
}: CreatePurchaseFormProps) => {
  const router = useRouter();
  const storeId = useStoreId();

  const { mutateAsync, isPending } = useCreatePurchase();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const { open } = useCreateSupplierModal();

  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createPurchaseSchema>>({
    resolver: zodResolver(createPurchaseSchema),
    defaultValues: {
      supplier_id: "",
      purchase_date: new Date(),
      products: [],
      discount_type: "",
      discount_amount: 0,
      total_discount: 0,
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
  const handleProductChange = (selectedOptions: MultiValue<OptionType>) => {
    const selectedValues = selectedOptions ? [...selectedOptions] : []; // Convert to mutable array

    const existingProductIds = selectedProducts.map((product) => product.id);

    const newProducts = selectedValues
      .filter((option) => !existingProductIds.includes(option.value))
      .map((option) => {
        const productDetails = products.find(
          (product) => `${product.id}` === option.value
        );
        return {
          id: option.value,
          name: option.label,
          quantity: 0,
          price: productDetails ? Number(productDetails.price) : 0,
          profit: 25,
          sell: productDetails
            ? Number(productDetails.price) +
              (Number(productDetails.price) * 25) / 100
            : 0,
          imei: [],
        };
      });

    const updatedProducts = [
      ...selectedProducts.filter((product) =>
        selectedValues.find((option) => option.value === product.id)
      ),
      ...newProducts,
    ];

    form.setValue("products", updatedProducts);
  };

  const onSubmit = async (values: z.infer<typeof createPurchaseSchema>) => {
    const finalProducts = values.products.map((p) => ({
      id: p.id,
      quantity: p.imei?.length || 0,
      price: p.price,
      sell_price: p.sell,
      imei: p.imei,
    }));

    const finalValue = {
      store_id: storeId,
      supplier_id: values.supplier_id,
      purchase_date: format(values.purchase_date, "dd-MM-yyyy HH:mm:ss"),
      discount_type: values.discount_type,
      discount_amount: values.discount_amount,
      payment_method: values.payment_method,
      payment_status: values.payment_status,
      notes: values.notes,
      products: finalProducts,
    };

    try {
      setError(null);
      await mutateAsync(finalValue);
      router.push(`/${storeId}/purchases`);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(getErrorMessage(error.response.data));
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const supplierOptions = suppliers.map((s) => ({
    value: `${s.id}`,
    label: s.name,
  }));

  const productOptions = products.map((p) => ({
    value: `${p.id}`,
    label: p.name,
  }));

  //Calculate the total price
  let total = 0;
  selectedProducts.forEach((product) => {
    total += product.quantity * product.price;
  });

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
                  <div className="col-span-6">
                    <FormField
                      name="supplier_id"
                      control={form.control}
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Supplier <span className="text-red-700">*</span>
                          </FormLabel>
                          <Controller
                            name="supplier_id"
                            control={form.control}
                            render={({ field: { onChange, value, ref } }) => (
                              <FormControl>
                                <Select2<OptionType>
                                  ref={ref}
                                  options={supplierOptions}
                                  styles={customStyles}
                                  value={supplierOptions.find(
                                    (option) => option.value === value
                                  )}
                                  onChange={(
                                    selectedOption: OptionType | null
                                  ) => {
                                    onChange(selectedOption?.value ?? null);
                                    setSupplier(
                                      selectedOption
                                        ? suppliers.find(
                                            (option) =>
                                              `${option.id}` ===
                                              `${selectedOption.value}`
                                          ) ?? null
                                        : null
                                    );
                                  }}
                                  placeholder="Select supplier"
                                  isClearable
                                />
                              </FormControl>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    {supplier && (
                      <div className="pt-10">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost">
                              <InfoIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                  {supplier.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {supplier.address}
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="width">Email</Label>
                                  <Input
                                    id="width"
                                    defaultValue={supplier.email}
                                    className="col-span-2 h-8"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="maxWidth">Phone</Label>
                                  <Input
                                    id="maxWidth"
                                    defaultValue={supplier.phone}
                                    className="col-span-2 h-8"
                                    disabled
                                  />
                                </div>

                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="maxHeight">Added on</Label>
                                  <Input
                                    id="maxHeight"
                                    defaultValue={format(
                                      new Date(supplier.created_at),
                                      "dd/MM/yyyy"
                                    )}
                                    className="col-span-2 h-8"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 ">
                    <div
                      className="flex items-center  cursor-pointer pt-12"
                      onClick={open}
                    >
                      <p className="text-xs uppercase font-bold text-neutral-500 ">
                        Add Address
                      </p>
                      <RiAddCircleFill className="size-5 ms-2 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-4 flex flex-col gap-y-4">
                <FormField
                  name="purchase_date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Purchase Date<span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DottedSeparator className="py-3" />

            {/* Products Section */}
            <div className="grid md:grid-cols-12 gap-4">
              <div className="col-span-7 flex flex-col justify-center gap-y-4">
                <div className="grid md:grid-cols-12 gap-4">
                  <div className="col-span-6">
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
                  <div className="col-span-4">
                    <div
                      className="flex items-center cursor-pointer pt-10"
                      onClick={() => router.push(`/${storeId}/products/create`)}
                    >
                      <p className="text-xs uppercase font-bold text-neutral-500">
                        Add Product
                      </p>
                      <RiAddCircleFill className="size-5 ms-2 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
                    </div>
                  </div>
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
                      <th className="px-4 py-2 border">Price</th>
                      <th className="px-4 py-2 border">Profit Margin (%)</th>
                      <th className="px-4 py-2 border">Sell Price</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <tr>
                          <td className="px-4 py-2 border">{field.name}</td>
                          <td className="px-4 py-2 border">
                            {form.watch(`products.${index}.quantity`) || 0}
                          </td>
                          <td className="px-4 py-2 border">
                            <FormField
                              name={`products.${index}.price`}
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      onChange={(e) => {
                                        const newPrice =
                                          parseFloat(e.target.value) || 0;
                                        const profit =
                                          form.getValues(
                                            `products.${index}.profit`
                                          ) || 0;
                                        form.setValue(
                                          `products.${index}.price`,
                                          newPrice
                                        );
                                        form.setValue(
                                          `products.${index}.sell`,
                                          newPrice + (newPrice * profit) / 100
                                        );
                                      }}
                                      onWheel={(e) => e.currentTarget.blur()}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <FormField
                              name={`products.${index}.profit`}
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      onChange={(e) => {
                                        const newProfit =
                                          parseFloat(e.target.value) || 0;
                                        const price =
                                          form.getValues(
                                            `products.${index}.price`
                                          ) || 0;
                                        form.setValue(
                                          `products.${index}.profit`,
                                          newProfit
                                        );
                                        form.setValue(
                                          `products.${index}.sell`,
                                          price + (price * newProfit) / 100
                                        );
                                      }}
                                      onWheel={(e) => e.currentTarget.blur()}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <FormField
                              name={`products.${index}.sell`}
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} type="number" disabled />
                                  </FormControl>
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

                        {/* IMEI Section */}
                        <tr>
                          <td
                            className="px-4 py-2 border text-right"
                            colSpan={1}
                          >
                            <div className="flex flex-col gap-2">
                              <p className="text-start text-sm">
                                Enter IMEI Numbers
                              </p>
                              <Input
                                placeholder="Enter IMEI and press Enter"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const value = (
                                      e.target as HTMLInputElement
                                    ).value.trim();
                                    if (value) {
                                      const currentImeis =
                                        form.getValues(
                                          `products.${index}.imei`
                                        ) || [];

                                      form.setValue(`products.${index}.imei`, [
                                        ...currentImeis,
                                        value,
                                      ]);

                                      form.setValue(
                                        `products.${index}.quantity`,
                                        currentImeis.length + 1
                                      );

                                      (e.target as HTMLInputElement).value = "";
                                    }
                                  }
                                }}
                              />

                              {/* Display added IMEIs */}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {form
                                  .watch(`products.${index}.imei`)
                                  ?.map((imei: string, imeiIndex: number) => (
                                    <div
                                      key={imeiIndex}
                                      className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
                                    >
                                      <span>{imei}</span>
                                      <button
                                        type="button"
                                        className="ml-2 text-red-600 hover:text-red-800"
                                        onClick={() => {
                                          const currentImeis =
                                            form.getValues(
                                              `products.${index}.imei`
                                            ) || [];
                                          const updated = currentImeis.filter(
                                            (_: string, i: number) =>
                                              i !== imeiIndex
                                          );
                                          form.setValue(
                                            `products.${index}.imei`,
                                            updated
                                          );
                                          form.setValue(
                                            `products.${index}.quantity`,
                                            updated.length
                                          );
                                        }}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
                <div className="text-end mt-3">
                  <p className="font-semibold text-sm ">
                    Total Items : {selectedProducts.length}
                  </p>
                  <p className="font-semibold text-sm ">
                    Net Total Amount : ৳ {numberWithCommas(total)}
                  </p>
                </div>
              </div>
            )}

            <DottedSeparator className="py-3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          setPurchaseAmount(total - discountAmount);
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
                            setPurchaseAmount(total - discountAmount);
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
            <div className="text-end mt-3">
              <p className="font-semibold text-sm ">
                Purchase Total : ৳ {numberWithCommas(purchaseAmount)}
              </p>
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
                  "Purchase"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
