import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";
interface LoginPayload {
  email: string;
}
interface ResponseType {
  status: number;
  message: string;
}
export const useForgotPassword = () => {
  const mutation = useMutation<ResponseType, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`forgot-password`, payload);
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
      toast.success("A password reset link has been sent to your email!");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });

  return mutation;
};
