import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductByBrandRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_brand_read"],
        queryFn: () => fetchData({
            path: `/product/brand/read`,
        }),
    });
};