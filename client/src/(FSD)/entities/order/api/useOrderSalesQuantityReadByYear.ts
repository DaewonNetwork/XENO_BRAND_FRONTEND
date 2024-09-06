import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderSalesQuantityReadByYear = (year:number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order-quantity-read"],
        queryFn: () => fetchData({
            path: `/orders/quantity-by-date?year=${year}`,
        }),
    });
};