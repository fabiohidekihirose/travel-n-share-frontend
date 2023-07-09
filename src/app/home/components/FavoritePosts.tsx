import axios from "axios";
import PostCard, { PostCardProps } from "./PostCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";

export default function FavoritePosts() {
  const [favPosts, setFavPosts] = useState([]);
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getFavPosts = async () => {
      const userId = userObj.user.uid;
      const favPostsData = await axios.get(
        `${baseURL}/user/${userId}/favorite`
      );

      setFavPosts(favPostsData.data);
    };

    getFavPosts();
  }, []);

  return (
    <>
      {favPosts.length &&
        favPosts.map((favPost: PostCardProps) => (
          <PostCard post={favPost.post} />
        ))}
    </>
  );
}
