import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ProductPayload {
  store_id: string;
  id: number;
  category_id: string;
  brand_id: string;
  name: string;
  price: number;
  image: File | string;
  description?: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ProductPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        `${payload.store_id}/products/${payload.id}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Product updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error("Failed to update product");
    },
  });

  return mutation;
};
