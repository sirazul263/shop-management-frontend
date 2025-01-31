import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface SellPayload {
  store_id: string; // Your store ID
  products: any; // Array of product IDs
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
  data: any;
}
export const useCreateSell = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, SellPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        `${payload.store_id}/sells/create`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Product added to the sell successfully!");
      queryClient.invalidateQueries({ queryKey: ["sells"] });
    },
    onError: (error: any) => {
      toast.error("Failed to add the product to the sell");
    },
  });

  return mutation;
};
