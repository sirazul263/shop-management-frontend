import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";
import { Brand } from "../types";

interface BrandPayload {
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
  data: Brand;
}
export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, BrandPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        `${payload.store_id}/brands/${payload.id}`,
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
    onSuccess: () => {
      toast.success("Brand updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: () => {
      toast.error("Failed to update brand");
    },
  });

  return mutation;
};
