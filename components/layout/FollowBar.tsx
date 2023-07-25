// FollowBar.tsx

import React, { useState, useEffect } from 'react';
import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';
import Button from '../Button';

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const [showMore, setShowMore] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    // Initialize displayedUsers with the first five users
    setDisplayedUsers(users.slice(0, 5));
  }, [users]);

  if (displayedUsers.length === 0) {
    return null;
  }

  const handleShowMore = () => {
    const startIndex = displayedUsers.length;
    const endIndex = startIndex + 5;
    const nextUsers = users.slice(startIndex, endIndex);

    setDisplayedUsers((prevUsers) => [...prevUsers, ...nextUsers]);

    if (endIndex >= users.length) {
      setShowMore(true);
    }
  };

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {displayedUsers.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
          {!showMore && displayedUsers.length < users.length && (
            <div className="flex justify-center mt-4">
              <Button label="Show more" onClick={handleShowMore} secondary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
