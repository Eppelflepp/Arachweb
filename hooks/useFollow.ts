import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);
    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleFollow = useCallback(async () => {
      if (!currentUser) {
          return loginModal.onOpen();
      }
  
      try {
          const request = isFollowing 
              ? () => axios.delete('/api/follow', { data: { userId } }) 
              : () => axios.post('/api/follow', { userId });
  
          const response = await request();
  
          console.log(`Response from follow API:`, response.data);
          
          // Refresh local state to ensure the UI reflects the updated following list
          mutateCurrentUser(); // Re-fetch current user data
          mutateFetchedUser(); // Re-fetch the user being followed/unfollowed
  
          toast.success(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
      } catch (error) {
          toast.error('Something went wrong');
          console.error('Toggle follow error:', error);
      }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);
  

    return {
        isFollowing,
        toggleFollow,
    };
};

export default useFollow;
