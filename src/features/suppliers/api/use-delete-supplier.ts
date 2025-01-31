import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ParamsType {
  storeId: string;
  supplierId: number;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axiosInstance.delete(
        `${params.storeId}/suppliers/${params.supplierId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Supplier deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => {
      toast.error("Failed to delete supplier");
    },
  });

  return mutation;
};
