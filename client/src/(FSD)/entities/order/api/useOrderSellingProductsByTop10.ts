import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderSellingProductsByTop10 = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order-selling-products-read"],
        queryFn: () => fetchData({
            path: `/orders/selling-products-top10`,
        }),
    });
};