"use client";

import { useAuthContext } from "@/components/AuthContext";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface FollowCardProps {
  image: string;
  full_name: string;
  username: string;
  user_id: string;
  isFollowed: boolean;
}

export default function FollowCard({
  image,
  full_name,
  username,
  isFollowed,
  user_id,
}: FollowCardProps) {
  const [buttonText, setButtonText] = useState(
    isFollowed ? "Unfollow" : "Follow"
  );
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const userObj = useAuthContext();

  const followButtonHandler = async () => {
    if (buttonText === "Follow") {
      setButtonText("Unfollow");
      await axios.post(`${baseURL}/user/${userObj.user.uid}/following/create`, {
        user_id_er: userObj.user.uid,
        user_id_ed: user_id,
      });
    } else {
      setButtonText("Follow");
      await axios.delete(
        `${baseURL}/user/${userObj.user.uid}/following/${user_id}/delete`
      );
    }
  };

  return (
    <>
      <div className="flex">
        <Image
          src={image}
          width={50}
          height={50}
          className="rounded-[50%]"
          alt="profile-image"
        ></Image>
        <div className="ml-[10px]">
          <p className="font-[700]">{full_name}</p>
          <p>{username}</p>
        </div>
      </div>
      <button
        className="bg-[#DBE2EF] text-[#112D4E] px-4 rounded-[10px] hover:shadow-[0_0_10px_rgb(219,226,239)]"
        onClick={followButtonHandler}
      >
        {buttonText}
      </button>
    </>
  );
}
