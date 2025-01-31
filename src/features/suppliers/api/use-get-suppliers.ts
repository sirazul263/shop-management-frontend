import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetSuppliers = (storeId: string) => {
  const query = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/suppliers`);
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
