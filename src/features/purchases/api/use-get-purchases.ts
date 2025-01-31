import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
export const useGetPurchases = (
  storeId: string,
  page: number,
  supplier: string,
  purchasedBy: string,
  paymentMethod: string,
  paymentStatus: string,
  date: Date | undefined
) => {
  const purchasedDate = date ? format(date, "dd/MM/yyyy") : "";
  const query = useQuery({
    queryKey: [
      "purchases",
      page,
      supplier,
      purchasedBy,
      paymentMethod,
      paymentStatus,
      purchasedDate,
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/purchases`, {
        params: {
          page,
          supplier,
          purchasedBy,
          paymentMethod,
          paymentStatus,
          purchasedDate,
        },
      });
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
