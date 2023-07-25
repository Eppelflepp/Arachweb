// usePosts.ts

import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (currentPage: number, userId?: string) => {
  const baseUrl = "/api/posts";

  const query = userId ? `?userId=${userId}&page=${currentPage}` : `?page=${currentPage}`;
  const url = `${baseUrl}${query}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
