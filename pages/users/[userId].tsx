import Header from "@/components/Header"
import useUser from "@/hooks/useUser";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import FollowBar from "@/components/layout/FollowBar";

import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser) {
        return (
            <div className="
                flex
                justify-center
                items-center
                h-full
            ">
                <ClipLoader color="red" size={80} />
            </div>
        )
    }

    return (
        <>
          <Header showBackArrow label={fetchedUser?.name} />
          <UserHero userId={userId as string} />
          <UserBio userId={userId as string} />
          <FollowBar userId={userId as string} /> {/* Pass the userId to the FollowBar component */}
          <PostFeed userId={userId as string} />
        </>
      );
}

export default UserView;