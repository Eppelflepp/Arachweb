import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error } = useSWR('/api/users', fetcher); // Adjust if API supports limit

  console.log('Data:', data);  // Log fetched data
  console.log('Error:', error); // Log any error

  return {
    data: data?.users || [], // Ensure this returns an empty array if users not found
    error,
    loading: !error && !data, // Define loading state based on error and data
  };
};

export default useUsers;
