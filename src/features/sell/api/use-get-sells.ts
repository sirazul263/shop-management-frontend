import { useDebouncedValue } from "@/hooks/use-debounced-value";
import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useGetSells = (
  storeId: string,
  page: number,
  invoiceId: string,
  customer: string,
  soldBy: string,
  paymentStatus: string,
  sellDate: Date | undefined
) => {
  const date = sellDate ? format(sellDate, "dd/MM/yyyy") : "";
  const debouncedInvoice = useDebouncedValue(invoiceId, 500);
  const debouncedCustomer = useDebouncedValue(customer, 500);

  const query = useQuery({
    queryKey: [
      "sells",
      page,
      debouncedInvoice,
      debouncedCustomer,
      soldBy,
      paymentStatus,
      date,
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(`${storeId}/sells`, {
        params: {
          page,
          invoiceId: debouncedInvoice,
          customer: debouncedCustomer,
          soldBy,
          paymentStatus,
          date,
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
