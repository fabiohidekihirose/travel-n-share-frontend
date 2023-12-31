import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { FollowProps } from "../../page";
import { PostProps } from "./PostCard";
import { FavProps } from "./MyPosts";
import axios from "axios";
import { useAuthContext } from "@/components/AuthContext";

interface FeedProps {
  followingUsers: FollowProps[];
}

export default function Feed({ followingUsers }: FeedProps) {
  const [feedPosts, setFeedPosts] = useState([]);
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getFeedPosts = async () => {
      const followingIds = followingUsers.map(
        (user: FollowProps) => user.user_id_ed
      );
      const feedPostsData = await axios.post(
        `${baseURL}/user/${userObj.user.uid}/feed`,
        { id_list: followingIds }
      );

      setFeedPosts(feedPostsData.data);
    };

    getFeedPosts();
  }, []);
  return (
    <>
      {feedPosts.length ? (
        feedPosts.map((feedPost: PostProps) => (
          <PostCard
            key={feedPost.id}
            post={feedPost}
            isFavorite={
              !!feedPost.favorite.filter(
                (favorite: FavProps) => favorite.user_id === userObj.user.uid
              ).length
            }
          />
        ))
      ) : (
        <div className="bg-[#DBE2EF] rounded-[10px] text-center p-4 font-[700] text-[20px]">
          No Posts On Feed Yet
        </div>
      )}
    </>
  );
}
