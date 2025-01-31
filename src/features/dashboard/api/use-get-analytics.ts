import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetAnalytics = (storeId: string) => {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/dashboard`);
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
