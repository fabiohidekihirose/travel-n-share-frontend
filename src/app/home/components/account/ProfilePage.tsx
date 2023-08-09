import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "../../page";
import { FollowProps } from "../../page";
import { useAuthContext } from "@/components/AuthContext";
import Link from "next/link";
import UserPosts from "../posts/UserPosts";
import FollowPage from "../follow/FollowPage";
import FollowButton from "@/components/FollowButton";

interface ProfilePageProps {
  followingUsers: FollowProps[];
}

export default function ProfilePage({ followingUsers }: ProfilePageProps) {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followingIds, setFollowingIds] = useState(
    followingUsers.map((user) => user.user_id_ed)
  );
  const searchParams = useSearchParams();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const userObj = useAuthContext();
  const user_id = searchParams.get("user_id");
  const section = searchParams.get("section");

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
  }, [user_id]);

  return (
    <>
      {userInfo && (
        <div className="w-full bg-[#DBE2EF] rounded-[10px] p-6 items-center flex flex-col space-y-[20px]">
          <div className="flex max-lg:flex-col space-x-[20px] items-center">
            <img
              src={userInfo.image}
              className="w-[130px] rounded-[50%] border-[2px] border-[#112D4E] shadow-[0_0_10px_rgb(17,45,78)]"
            ></img>
            <div>
              <p className="font-[700] text-[30px]">{userInfo.full_name}</p>
              <p className="font-[300]">@{userInfo.username}</p>
            </div>

            {userObj.user.uid === user_id ? (
              <Link
                href={"/home?page=edit-profile"}
                className="bg-[#112D4E] text-[#DBE2EF] p-2 rounded-[10px] hover:shadow-[0_0_10px_rgb(63,114,175)] hover:bg-[#3F72AF]"
              >
                Edit profile
              </Link>
            ) : (
              <FollowButton
                classType="profile"
                user_id={user_id}
                isFollowed={!!(user_id && followingIds.includes(user_id))}
              />
            )}
          </div>
          <div className="lg:w-[500px]">{userInfo.bio}</div>
          <div className="w-[300px] flex justify-between px-2">
            <Link
              href={`/home?page=profile&user_id=${user_id}&section=followers`}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">
                {userInfo.followers.length}
              </p>
              <p className="font-[300]">Followers</p>
            </Link>
            <Link
              href={`/home?page=profile&user_id=${user_id}&section=following`}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">
                {userInfo.following.length}
              </p>
              <p className="font-[300]">Following</p>
            </Link>
            <Link
              href={`/home?page=profile&user_id=${user_id}&section=posts`}
              className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
            >
              <p className="font-[700] text-[20px]">{userInfo.posts.length}</p>
              <p className="font-[300]">Posts</p>
            </Link>
          </div>
        </div>
      )}
      {(!section || section === "posts") && (
        <UserPosts userPosts={userPosts} user_id={user_id} />
      )}
      {(section === "following" || section === "followers") && <FollowPage />}
    </>
  );
}
