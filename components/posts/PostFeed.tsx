import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);

    return (
        <>
            {posts.map((posts: Record<string, any>) => (
                <PostItem
                    userId={userId}
                    key={posts.id}
                    data={posts}
                />
            ))}
        </>
    );
}

export default PostFeed;