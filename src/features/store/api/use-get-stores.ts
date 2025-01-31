import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetStores = () => {
  const query = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const response = await axiosInstance.get("stores");
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
