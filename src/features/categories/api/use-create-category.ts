import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";

interface CategoryPayload {
  name: string;
  image: string | File;
  is_active: boolean;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, CategoryPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post("categories/create", payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Category created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create category");
    },
  });

  return mutation;
};
