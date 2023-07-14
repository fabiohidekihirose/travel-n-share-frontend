import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";
import PostCard from "./PostCard";
import { PostProps } from "./PostCard";

export interface FavProps {
  user_id: string;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getPosts = async () => {
      const userId = userObj.user.uid;
      const userPosts = await axios.get(`${baseURL}/user/${userId}/posts`);

      setPosts(userPosts.data);
    };

    getPosts();
  }, []);

  return (
    <>
      {posts.length ? (
        posts.map((post: PostProps) => {
          const userId = userObj.user.uid;
          return (
            <PostCard
              key={post.id}
              post={post}
              isFavorite={
                !!post.favorite.filter(
                  (favorite: FavProps) => favorite.user_id === userId
                ).length
              }
            />
          );
        })
      ) : (
        <div className="bg-[#DBE2EF] rounded-[10px] text-center p-4 font-[700] text-[20px]">
          No Posts Yet
        </div>
      )}
    </>
  );
}
