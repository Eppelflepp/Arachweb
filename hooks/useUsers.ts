import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error } = useSWR('/api/users', fetcher);

  return {
    data: data?.users,
    error,
  };
};

export default useUsers;
