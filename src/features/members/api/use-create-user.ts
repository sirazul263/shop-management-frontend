import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "../types";

interface UserPayload {
  store_id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: User;
}
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, UserPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`/create-user`, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  return mutation;
};
