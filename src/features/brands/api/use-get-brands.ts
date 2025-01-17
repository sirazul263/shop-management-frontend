import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetBrands = () => {
  const query = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await axiosInstance.get("brands");
      if (response.status !== 200) {
        return {
          status: response.status,
          message: getErrorMessage(response),
        };
      }
      return response.data;
    },
  });
  return query;
};
