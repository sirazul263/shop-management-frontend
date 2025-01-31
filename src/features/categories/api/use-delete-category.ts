import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ParamsType {
  categoryId: number;
  storeId: string;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axiosInstance.delete(
        `${params.storeId}/categories/${params.categoryId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};
