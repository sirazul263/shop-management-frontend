import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";

interface BrandPayload {
  store_id: string;
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
export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, BrandPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        `${payload.store_id}/brands/create`,
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
      toast.success("Brand created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create brand");
    },
  });

  return mutation;
};
