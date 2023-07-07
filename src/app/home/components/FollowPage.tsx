import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/components/AuthContext";
import Image from "next/image";

interface FollowPageUserProps {
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

        setFollowerUsers(followersData.data);
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
    <div className="w-[800px] h-[80vh] rounded-[10px] mt-[30px] overflow-y-scroll text-[#DBE2EF] space-y-[20px]">
      {follow === "followers"
        ? followerUsers.map((user: FollowerUserProps) => (
            <div className="flex">
              <Image
                src={user.user_er.image}
                width={50}
                height={50}
                className="rounded-[50%]"
                alt="profile-image"
              ></Image>
              <div className="ml-[10px]">
                <p>{user.user_er.full_name}</p>
                <p>{user.user_er.username}</p>
              </div>
            </div>
          ))
        : followingUsers.map((user: FollowingUserProps) => (
            <div className="flex">
              <Image
                src={user.user_ed.image}
                width={50}
                height={50}
                className="rounded-[50%]"
                alt="profile-image"
              ></Image>
              <div className="ml-[10px]">
                <p>{user.user_ed.full_name}</p>
                <p>{user.user_ed.username}</p>
              </div>
            </div>
          ))}
    </div>
  );
}
