import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";
interface LoginPayload {
  email: string;
  token: string;
  new_password: string;
}
interface ResponseType {
  status: number;
  message: string;
}
export const useResetPassword = () => {
  const mutation = useMutation<ResponseType, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`reset-password`, payload);
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
      toast.success("Password has been reset successfully!");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });

  return mutation;
};
