import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Store } from "../types";

interface StorePayload {
  storeId: string;
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
  data: Store;
}
export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, StorePayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        `stores/${payload.storeId}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Store updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError: () => {
      toast.error("Failed to update store");
    },
  });

  return mutation;
};
