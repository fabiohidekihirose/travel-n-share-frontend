import { useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

interface FollowButtonProps {
  isFollowed: boolean | null;
  user_id: string | null;
  classType: string;
}

export default function FollowButton({
  isFollowed,
  user_id,
  classType,
}: FollowButtonProps) {
  const [buttonText, setButtonText] = useState(
    isFollowed ? "Unfollow" : "Follow"
  );
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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
    <button
      className={
        classType === "profile"
          ? "bg-[#112D4E] text-[#DBE2EF] p-2 rounded-[10px] hover:shadow-[0_0_10px_rgb(63,114,175)] hover:bg-[#3F72AF]"
          : "bg-[#DBE2EF] text-[#112D4E] px-4 rounded-[10px] hover:shadow-[0_0_10px_rgb(219,226,239)]"
      }
      onClick={followButtonHandler}
    >
      {buttonText}
    </button>
  );
}
