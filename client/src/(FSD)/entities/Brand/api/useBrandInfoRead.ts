import { useQuery } from "@tanstack/react-query";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useBrandInfoRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["brand_info_read"],
        queryFn: () => fetchData({ path: "/brand/read", isAuthRequired: true }),
    });
};
