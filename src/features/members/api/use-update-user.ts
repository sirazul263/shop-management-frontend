import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface UserPayload {
  id: number;
  status: string;
}

interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, UserPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        `/user/update/${payload.id}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return mutation;
};
