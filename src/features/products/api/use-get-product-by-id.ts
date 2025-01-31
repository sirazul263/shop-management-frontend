import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
interface ProductProps {
  storeId: string;
  productId: string | null;
}
export const useGetProductById = ({ storeId, productId }: ProductProps) => {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${storeId}/products/${productId}`
      );
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
