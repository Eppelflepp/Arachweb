// PostFeed.tsx

import React, { useState, useEffect } from "react";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import Button from "../Button";

interface Comment {
  id: string;
  content: string;
  // Add other properties of a comment here
}

interface User {
  id: string;
  name: string;
  // Add other properties of a user here
}

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  user: User;
  comments: Comment[];
  // Add other properties of a post here
}

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const itemsPerPage = 10;
  const initialPage = 1;
  const { data, isLoading, error } = usePosts(initialPage, userId);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setAllPosts(data);
    }
  }, [data]);

  console.log("Loaded Posts:", data);
  console.log("All Posts:", allPosts);
  console.log("Is Loading:", isLoading);
  console.log("Error:", error);

  const fetchMorePosts = async (currentPage: number, userId?: string) => {
    try {
      const queryParams = userId ? `?userId=${userId}&page=${currentPage}` : `?page=${currentPage}`;
      const response = await fetch(`/api/posts${queryParams}`);
      const newData = await response.json();
      return newData; // Assuming the response contains an array of new posts
    } catch (error) {
      console.error("Error fetching more posts:", error);
      throw error;
    }
  };

  const loadMorePosts = async () => {
    const nextPage = Math.ceil(allPosts.length / itemsPerPage) + 1;
    try {
      const newPosts = await fetchMorePosts(nextPage, userId);
      setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
    } catch (error) {
      console.log("Error loading more posts:", error);
    }
  };

  if (isLoading && allPosts.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {allPosts.map((post: Post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
      {isLoading && <div>Loading more posts...</div>}
      {!isLoading && data && data.length > 0 && (
        <div className="flex flex-col items-center my-4">
        <Button label="Load more" onClick={loadMorePosts} disabled={isLoading} secondary fullWidth/>
      </div>
      )}
    </div>
  );
};

export default PostFeed;
