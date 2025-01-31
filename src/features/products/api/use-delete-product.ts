import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ParamsType {
  storeId: string;
  productId: number;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axiosInstance.delete(
        `${params.storeId}/products/${params.productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete product");
    },
  });

  return mutation;
};
