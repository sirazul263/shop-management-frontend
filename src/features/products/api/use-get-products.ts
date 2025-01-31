import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetProducts = (storeId: string) => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/products`);
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
