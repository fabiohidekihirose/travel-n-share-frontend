import { useAuthContext } from "@/components/AuthContext";
import axios from "axios";
import Link from "next/link";
import { UserProps } from "../page";

interface NewPostProps {
  currUser: UserProps;
}

export default function NewPost({ currUser }: NewPostProps) {
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      user_id: userObj.user.uid,
      content: event.currentTarget.content.value,
      timestamp: new Date(),
    };

    event.currentTarget.content.value = "";

    await axios.post(
      `${baseURL}/user/${userObj.user.uid}/posts/create`,
      payload
    );
  };

  return (
    <div className="h-full p-6 bg-[#DBE2EF] rounded-[10px] flex flex-col items-center space-y-[20px]">
      <h2 className="font-[700] text-[30px] border-b-[1px] border-[#112D4E] w-[90%] text-center">
        New Post
      </h2>
      <div className="flex items-center space-x-[10px]">
        <img
          src={currUser.image}
          className="rounded-[50%] w-[70px] border-[2px] border-[#112D4E]"
        ></img>
        <div>
          <Link href={"/home?page=profile&user_id=123"} className="font-[700]">
            {currUser.full_name}
          </Link>
          <p className="font-[500]">@{currUser.username}</p>
        </div>
      </div>
      <form
        className="w-[90%] flex flex-col space-y-[15px]"
        onSubmit={submitHandler}
      >
        <textarea
          placeholder="Write a travel report..."
          className="p-2 rounded-[10px] outline-none"
          rows={10}
          name="content"
        ></textarea>
        <button className="bg-[#112D4E] text-[#DBE2EF] rounded-[10px] p-2 hover:shadow-[0_0_10px_rgb(17,45,78)] font-[600] text-[20px] hover:shadow-[0_0_10px_rgb(63,114,175)] hover:bg-[#3F72AF]">
          Post
        </button>
      </form>
    </div>
  );
}
