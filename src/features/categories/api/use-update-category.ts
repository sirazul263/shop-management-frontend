import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";

interface CategoryPayload {
  store_id: string;
  id: number;
  name: string;
  is_active: boolean;
  image: string | File;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, CategoryPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        `${payload.store_id}/categories/${payload.id}`,
        payload
      );
      if (response.status !== 200 || response.data.status !== 1) {
        throw new Error(
          response.status !== 200
            ? getErrorMessage(response)
            : getMessage(response.data)
        );
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error("Failed to update category");
    },
  });

  return mutation;
};
