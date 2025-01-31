import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useGetLogs = (
  storeId: string,
  page: number,
  type: string,
  user: string,
  logDate: Date | undefined
) => {
  const date = logDate ? format(logDate, "dd/MM/yyyy") : "";
  const query = useQuery({
    queryKey: ["logs", page, type, user, date], // Include params in query key
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/logs`, {
        params: { page, type, user, date },
      });
      if (response.status !== 200) {
        throw new Error(getErrorMessage(response));
      }
      return response.data;
    },
    staleTime: 1000 * 60, // Keeps data fresh for 1 minute
  });

  return query;
};
