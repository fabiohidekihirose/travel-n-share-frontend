import { useEffect, useState } from "react";
import { FollowProps } from "../../page";
import { PostProps } from "./PostCard";
import { FavProps } from "./MyPosts";
import { useAuthContext } from "@/components/AuthContext";
import PostCard from "./PostCard";
import axios from "axios";

interface ExplorePageProps {
  followingUsers: FollowProps[];
}

export default function ExplorePage({ followingUsers }: ExplorePageProps) {
  const [explorePosts, setExplorePosts] = useState([]);
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getExplorePosts = async () => {
      const followingIds = followingUsers.map((user) => user.user_id_ed);

      followingIds.push(userObj.user.uid);

      const explorePostsData = await axios.post(
        `${baseURL}/user/${userObj.user.uid}/explore`,
        { id_list: followingIds }
      );

      setExplorePosts(explorePostsData.data);
    };

    getExplorePosts();
  }, []);

  return (
    <>
      {explorePosts.length ? (
        explorePosts.map((explorePost: PostProps) => (
          <PostCard
            key={explorePost.id}
            post={explorePost}
            isFavorite={
              !!explorePost.favorite.filter(
                (favorite: FavProps) => favorite.user_id === userObj.user.uid
              ).length
            }
          />
        ))
      ) : (
        <div className="bg-[#DBE2EF] rounded-[10px] text-center p-4 font-[700] text-[20px]">
          No Posts On Explore Yet
        </div>
      )}
    </>
  );
}
