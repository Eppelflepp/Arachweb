// usePosts.ts

import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const usePosts = (page?: number, userId?: string | null) => {
  const url = userId ? `/api/posts?userId=${userId}&page=${page || 1}` : `/api/posts?page=${page || 1}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default usePosts;
