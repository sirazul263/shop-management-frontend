import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface StorePayload {
  name: string;
  phone: string;
  address: string;
  description?: string;
  image: string | File;
  active: boolean;
}
interface ResponseType {
  status: number;
  message: string;
  data: any;
}
export const useCreateStore = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, StorePayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post("stores/create", payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Store created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create store");
    },
  });

  return mutation;
};
