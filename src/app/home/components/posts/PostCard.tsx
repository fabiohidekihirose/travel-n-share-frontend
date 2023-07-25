"use client";

import { useAuthContext } from "@/components/AuthContext";
import axios from "axios";
import { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import CommentSection from "../comments/CommentSection";
import Link from "next/link";
import moment from "moment";

export interface UserProps {
  id: string;
  username: string;
  image: string;
}

export interface PostProps {
  id: number;
  user: UserProps;
  content: string;
  timestamp: Date;
  favorite: [];
  comment: [];
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
  const [showComments, setShowComments] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const [showButtonText, setShowButtonText] = useState("Show More");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const userObj = useAuthContext();

  const favButtonHandler = async () => {
    if (isFavButtonSelected) {
      setNumFavorites((num) => num - 1);
      setIsFavButtonSelected(false);

      try {
        await axios.delete(
          `${baseURL}/user/${userObj.user.uid}/favorite/${post.id}/delete`
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setNumFavorites((num) => num + 1);
      setIsFavButtonSelected(true);

      const payload = { post_id: post.id, user_id: userObj.user.uid };

      try {
        await axios.post(
          `${baseURL}/user/${userObj.user.uid}/favorite/create`,
          payload
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showCommentsHandler = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  const deletePostHandler = async () => {
    try {
      await axios.delete(
        `${baseURL}/user/${userObj.user.uid}/posts/${post.id}/delete`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const showMoreOrLessHandler = () => {
    if (showLess) {
      setShowLess(false);
      setShowButtonText("Show Less");
    } else {
      setShowLess(true);
      setShowButtonText("Show More");
    }
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
            <Link
              href={`/home?page=profile&user_id=${post.user.id}`}
              className="font-[700] text-[18px]"
            >
              {post.user.username}
            </Link>
            <p className="font-[300] text-[12px]">
              {moment(post.timestamp).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
        {userObj.user.uid === post.user.id && (
          <LuTrash
            size={20}
            className="mr-[20px] hover:cursor-pointer"
            onClick={deletePostHandler}
          />
        )}
      </div>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div
        className={`whitespace-pre-wrap ${showLess ? "line-clamp-[10]" : ""}`}
      >
        {post.content}
      </div>
      <button className="underline" onClick={showMoreOrLessHandler}>
        {showButtonText}
      </button>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div className="w-full flex space-x-[2%]">
        <button
          className={`w-[49%] flex items-center justify-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] rounded-[10px] p-2 ${
            isFavButtonSelected
              ? "bg-[#112D4E] text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)]"
              : ""
          }`}
          onClick={favButtonHandler}
        >
          <MdOutlineFavoriteBorder className="mr-[10px]" />
          {`${numFavorites} Favorites`}
        </button>
        <button
          className="w-[49%] text-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] rounded-[10px] p-2"
          onClick={showCommentsHandler}
        >
          Comment
        </button>
      </div>
      {showComments && (
        <CommentSection
          key={post.id}
          comments={post.comment}
          post_id={post.id}
        />
      )}
    </div>
  );
}
