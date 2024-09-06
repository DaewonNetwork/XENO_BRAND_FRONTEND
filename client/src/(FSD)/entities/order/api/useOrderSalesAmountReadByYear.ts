import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderSalesAmountReadByYear = (year:number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order-amount-read"],
        queryFn: () => fetchData({
            path: `/orders/amount-by-date?year=${year}`,
        }),
    });
};