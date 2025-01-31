import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetCategories = (storeId: string) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/categories`);
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
