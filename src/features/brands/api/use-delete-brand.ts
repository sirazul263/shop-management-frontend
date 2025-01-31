import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ParamsType {
  storeId: string;
  brandId: number;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axiosInstance.delete(
        `${params.storeId}/brands/${params.brandId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Brand deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: () => {
      toast.error("Failed to delete brand");
    },
  });

  return mutation;
};
