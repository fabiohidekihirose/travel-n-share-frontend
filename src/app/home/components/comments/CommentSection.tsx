import { useAuthContext } from "@/components/AuthContext";
import CommentCard from "./CommentCard";
import { UserProps } from "../posts/PostCard";
import { useState } from "react";
import axios from "axios";

interface CommentProps {
  id: number;
  content: string;
  post_id: number;
  user: UserProps;
}

interface CommentSectionProps {
  comments: CommentProps[];
  post_id: number;
}

export default function CommentSection({
  comments,
  post_id,
}: CommentSectionProps) {
  const [commentsList, setCommentsList] = useState(comments);
  const [comment, setComment] = useState("");
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const payload = {
        user_id: userObj.userInfo.id,
        post_id,
        content: comment,
      };
      const newComment = await axios.post(
        `${baseURL}/user/${userObj.userInfo.id}/post/${post_id}/comment/create`,
        payload
      );
      setCommentsList((prevCommentsList) => [
        ...prevCommentsList,
        newComment.data,
      ]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-t-[1px] border-[#112D4E] pt-[15px] space-y-[10px]">
      <form className="flex space-x-[10px]" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="New comment..."
          className="w-full p-2 rounded-[10px]"
          onChange={changeHandler}
          value={comment}
        />
        <button
          type="submit"
          className="bg-[#112D4E] rounded-[10px] text-[#DBE2EF] px-2"
        >
          Post
        </button>
      </form>
      {commentsList.length
        ? commentsList.map((comment) => (
            <CommentCard
              key={comment.id}
              image={comment.user.image}
              username={comment.user.username}
              content={comment.content}
              user_id={comment.user.id}
            />
          ))
        : null}
    </div>
  );
}
