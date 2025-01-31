import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ProductPayload {
  store_id: string;
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
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ProductPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        `${payload.store_id}/products/create`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Product created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create product");
    },
  });

  return mutation;
};
