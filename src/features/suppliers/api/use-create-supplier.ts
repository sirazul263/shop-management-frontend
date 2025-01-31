import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Supplier } from "../types";

interface SupplierPayload {
  store_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: Supplier;
}
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, SupplierPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        `${payload.store_id}/suppliers/create`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Supplier created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => {
      toast.error("Failed to create supplier");
    },
  });

  return mutation;
};
