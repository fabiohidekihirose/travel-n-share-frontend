import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";
import PostCard from "./PostCard";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getPosts = async () => {
      const userId = userObj.user.id;
      const userPosts = await axios.get(`${baseURL}/user/${userId}/posts`);
      console.log(userPosts.data);

      setPosts(userPosts.data);
    };

    getPosts();
  }, []);

  return (
    <div className="w-[800px] h-[85.5vh] rounded-[10px] mt-[30px] overflow-y-scroll text-[#112D4E] space-y-[20px]">
      {posts &&
        posts.map((post) => {
          return <PostCard post={post} />;
        })}
    </div>
  );
}
