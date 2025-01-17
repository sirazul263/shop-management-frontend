import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface SupplierPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: any;
}
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, SupplierPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post("suppliers/create", payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Supplier created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create supplier");
    },
  });

  return mutation;
};
