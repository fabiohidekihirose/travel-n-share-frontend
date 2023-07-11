"use client";

import { useAuthContext } from "@/components/AuthContext";
import axios from "axios";
import { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuTrash } from "react-icons/lu";

interface UserProps {
  id: string;
  username: string;
  image: string;
}

export interface PostProps {
  id: number;
  user: UserProps;
  content: string;
  favorite: [];
}

export interface PostCardProps {
  post: PostProps;
  isFavorite: boolean;
}

export default function PostCard({ post, isFavorite }: PostCardProps) {
  const [numFavorites, setNumFavorites] = useState<number>(
    post.favorite.length
  );
  const [isFavButtonSelected, setIsFavButtonSelected] = useState(isFavorite);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const userObj = useAuthContext();

  const favButtonHandler = async () => {
    if (isFavButtonSelected) {
      setNumFavorites((num) => num - 1);
      setIsFavButtonSelected(false);

      await axios.delete(
        `${baseURL}/user/${userObj.user.uid}/favorite/${post.id}/delete`
      );
    } else {
      setNumFavorites((num) => num + 1);
      setIsFavButtonSelected(true);

      const payload = { post_id: post.id, user_id: userObj.user.uid };
      await axios.post(
        `${baseURL}/user/${userObj.user.uid}/favorite/create`,
        payload
      );
    }
  };

  const deleteHandler = async () => {
    await axios.delete(
      `${baseURL}/user/${userObj.user.uid}/posts/${post.id}/delete`
    );
  };

  return (
    <div className="flex flex-col space-y-[10px] bg-[#DBE2EF] p-6 pb-4 rounded-[10px] shadow-[0_0_10px_rgb(219,226,239)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[10px]">
          <img
            src={post.user.image}
            alt="profile-picture"
            className="rounded-[50%] w-[50px] border-[2px] border-[#112D4E]"
          />
          <div className="flex flex-col">
            <p className="font-[700]">{post.user.username}</p>
            <p>TimeStamp</p>
          </div>
        </div>
        {userObj.user.uid === post.user.id && (
          <LuTrash
            size={20}
            className="mr-[20px] hover:cursor-pointer"
            onClick={deleteHandler}
          />
        )}
      </div>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div className="whitespace-pre-wrap">{post.content}</div>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div className="w-full flex">
        <button
          className={`w-[50%] flex items-center justify-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] rounded-[10px] p-2 ${
            isFavButtonSelected
              ? "bg-[#112D4E] text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)]"
              : ""
          }`}
          onClick={favButtonHandler}
        >
          <MdOutlineFavoriteBorder className="mr-[10px]" />
          {`${numFavorites} Favorites`}
        </button>
        <button className="w-[50%] text-center">Comment</button>
      </div>
    </div>
  );
}
