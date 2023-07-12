import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "../page";
import { PostProps } from "./PostCard";
import { FavProps } from "./MyPosts";
import PostCard from "./PostCard";
import Link from "next/link";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [userPosts, setUserPosts] = useState([]);
  const searchParams = useSearchParams();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const user_id = searchParams.get("user_id");

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await axios.get(`${baseURL}/user/${user_id}`);

      setUserInfo(userData.data);
    };

    const getPosts = async () => {
      const userPosts = await axios.get(`${baseURL}/user/${user_id}/posts`);

      setUserPosts(userPosts.data);
    };

    getPosts();
    getUserInfo();
  }, []);

  return (
    <>
      {userInfo && (
        <div className="w-full bg-[#DBE2EF] rounded-[10px] p-6 items-center flex flex-col shadow-[0_0_10px_rgb(219,226,239)] space-y-[20px] ">
          <img
            src={userInfo.image}
            className="w-[130px] rounded-[50%] border-[2px] border-[#112D4E] shadow-[0_0_10px_rgb(17,45,78)]"
          ></img>
          <div className="text-center">
            <p className="font-[700] text-[30px]">{userInfo.full_name}</p>
            <p className="font-[300]">@{userInfo.username}</p>
          </div>
          <div className="w-[300px] flex justify-between px-2">
            <Link
              href={"/home?page=followers"}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">
                {userInfo.followers.length}
              </p>
              <p className="font-[300]">Followers</p>
            </Link>
            <Link
              href={"/home?page=following"}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">
                {userInfo.following.length}
              </p>
              <p className="font-[300]">Following</p>
            </Link>
            <Link
              href={"/home?page=my-posts"}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">{userInfo.posts.length}</p>
              <p className="font-[300]">Posts</p>
            </Link>
          </div>
        </div>
      )}
      {userPosts &&
        userPosts.map((post: PostProps) => (
          <PostCard
            key={post.id}
            post={post}
            isFavorite={
              !!post.favorite.filter(
                (favorite: FavProps) => favorite.user_id === user_id
              ).length
            }
          />
        ))}
    </>
  );
}
