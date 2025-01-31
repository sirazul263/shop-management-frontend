import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Purchase } from "../types";

interface PurchasePayload {
  store_id: string;
  supplier_id: string;
  purchase_date: string;
  products: unknown; // Array of product IDs
  discount_type?: string; //,
  discount_amount?: number;
  payment_method: string;
  payment_status: string;
  notes?: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: Purchase;
}
export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, PurchasePayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        `${payload.store_id}/purchases/create`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product purchased Successfully!");
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: () => {
      toast.error("Failed to purchase product");
    },
  });

  return mutation;
};
