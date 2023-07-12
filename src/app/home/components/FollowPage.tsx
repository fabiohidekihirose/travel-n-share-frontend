import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/components/AuthContext";
import FollowCard from "./FollowCard";

interface FollowPageUserProps {
  id: string;
  image: string;
  full_name: string;
  username: string;
}

interface FollowerUserProps {
  user_er: FollowPageUserProps;
}

interface FollowingUserProps {
  user_ed: FollowPageUserProps;
}

export default function FollowPage() {
  const [followerUsers, setFollowerUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const searchParams = useSearchParams();
  const follow = searchParams.get("page");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const userObj = useAuthContext();

  useEffect(() => {
    const getFollows = async () => {
      const userId = userObj.user.uid;
      if (follow === "followers") {
        const followersData = await axios.get(
          `${baseURL}/user/${userId}/followers`
        );

        const followingData = await axios.get(
          `${baseURL}/user/${userId}/following`
        );

        const followingIds = followingData.data.map(
          (user: FollowingUserProps) => user.user_ed.id
        );

        setFollowerUsers(followersData.data);
        setFollowingIds(followingIds);
      } else {
        const followingData = await axios.get(
          `${baseURL}/user/${userId}/following`
        );

        setFollowingUsers(followingData.data);
      }
    };

    getFollows();
  }, [follow]);

  return (
    <div
      key={"follow"}
      className="w-full h-full rounded-[10px] p-6 overflow-y-scroll text-[#DBE2EF] space-y-[20px] bg-[#DBE2EF]"
    >
      {follow === "followers" ? (
        followerUsers.length ? (
          followerUsers.map((user: FollowerUserProps) => (
            <div
              key={user.user_er.id}
              className="flex bg-[#112D4E] p-4 rounded-[10px] shadow-[0_0_10px_rgb(17,45,78)] justify-between"
            >
              <FollowCard
                image={user.user_er.image}
                username={user.user_er.username}
                full_name={user.user_er.full_name}
                user_id={user.user_er.id}
                isFollowed={
                  followingIds.includes(user.user_er.id as never) ? true : false
                }
              />
            </div>
          ))
        ) : (
          <div>No followers yet</div>
        )
      ) : followingUsers.length ? (
        followingUsers.map((user: FollowingUserProps) => (
          <div
            key={user.user_ed.id}
            className="flex bg-[#112D4E] p-4 rounded-[10px] shadow-[0_0_20px_rgb(17,45,78)] justify-between"
          >
            <FollowCard
              image={user.user_ed.image}
              username={user.user_ed.username}
              full_name={user.user_ed.full_name}
              user_id={user.user_ed.id}
              isFollowed={true}
            />
          </div>
        ))
      ) : (
        <div>No followers yet</div>
      )}
    </div>
  );
}
