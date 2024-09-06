import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductSoldOutRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order-sold-out-products-read"],
        queryFn: () => fetchData({
            path: `/product/sold-out-count`,
        }),
    });
};