import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  access_token: string; // The authentication token
  user: {
    email: string;
    name: string;
    role: string;
  };
}
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`login`, payload);
      if (response.status !== 200 || response.data.status !== 1) {
        throw new Error(
          response.status !== 200
            ? getErrorMessage(response)
            : getMessage(response.data)
        );
      }
      return response.data;
    },
    onSuccess: (data) => {
      const { access_token } = data;
      const user = {
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };

      Cookies.set("userToken", access_token, {
        expires: 365, // Expires in 7 days
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      Cookies.set("authUser", JSON.stringify(user), {
        expires: 365, // Expires in 7 days
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      toast.success("Logged In Successfully!");
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });

  return mutation;
};
