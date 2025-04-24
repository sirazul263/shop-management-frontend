import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useLogout } from "@/features/auth/api/use-logout";

interface UserPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
}
export const useChangePassword = () => {
  const { mutate: logout } = useLogout();
  const mutation = useMutation<ResponseType, Error, UserPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`/change-password`, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password Changed Successfully!");
      logout();
    },
    onError: () => {
      toast.error("Failed to change password");
    },
  });

  return mutation;
};
