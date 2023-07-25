// useUsers.ts

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher, {
    // Add the dependency array to fetch the data only once
    revalidateOnMount: true,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
