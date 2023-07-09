import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";
import PostCard from "./PostCard";
import { PostProps } from "./PostCard";

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
      {posts &&
        posts.map((post: PostProps) => {
          return <PostCard key={post.id} post={post} />;
        })}
    </>
  );
}
