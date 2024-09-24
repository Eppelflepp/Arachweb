import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser"; // Import the current user hook

// Custom hook to fetch users with an optional limit
const useUsers = (limit: number) => {
  const { data, error } = useSWR(`/api/users?limit=${limit}`, fetcher);
  return { data: data || [], error };
};

const FollowBar = () => {
  const { data: currentUser } = useCurrentUser(); // Fetch the current user
  const { data: initialUsers = [], error: initialError } = useUsers(10); // Fetch the first 10 users
  const followingIds = currentUser?.followingIds || [];

  // Filter initial users to exclude followed ones
  const filteredInitialUsers = initialUsers.filter((user: { id: any; }) => !followingIds.includes(user.id));

  // Calculate how many additional users are needed
  const usersNeeded = Math.max(0, 10 - filteredInitialUsers.length);
  const { data: additionalUsers = [], error: additionalError } = useUsers(usersNeeded); // Fetch additional users

  // Filter additional users to exclude followed ones and already included users
  const filteredAdditionalUsers = additionalUsers.filter((user: { id: any; }) => 
    !followingIds.includes(user.id) && 
    !filteredInitialUsers.some((initialUser: { id: any; }) => initialUser.id === user.id) // Exclude already included users
  );

  // Combine filtered initial users with filtered additional users, ensuring none are duplicates
  const combinedUsers = [...filteredInitialUsers, ...filteredAdditionalUsers].slice(0, 10); // Limit to 10 users

  // Handle errors
  if (initialError || additionalError) {
    return <div>Error loading users: {(initialError || additionalError).message}</div>;
  }

  // Handle empty state
  if (combinedUsers.length === 0) {
    return (
      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-neutral-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <p className="text-neutral-400">No new users found to follow.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {combinedUsers.map((user) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
