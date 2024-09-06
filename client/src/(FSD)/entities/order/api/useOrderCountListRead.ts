import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderCountListRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order-count-read"],
        queryFn: () => fetchData({
            path: `/orders/count`,
        }),
    });
};