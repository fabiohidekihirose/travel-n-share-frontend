import { MdOutlineFavoriteBorder } from "react-icons/md";

interface UserProps {
  username: string;
  image: string;
}

interface PostProps {
  id: number;
  user: UserProps;
  content: string;
  favorite: [];
}

interface PostCardProps {
  post: PostProps;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex flex-col space-y-[10px] bg-[#DBE2EF] p-6 rounded-[10px]">
      <div className="flex items-center space-x-[10px]">
        <img
          src={post.user.image}
          alt="profile-picture"
          className="rounded-[50%] w-[50px]"
        />
        <div className="flex flex-col">
          <p>{post.user.username}</p>
          <p>TimeStamp</p>
        </div>
      </div>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div className="whitespace-pre-wrap">{post.content}</div>
      <div className="border-b-[1px] border-[#112D4E]"></div>
      <div className="w-full flex">
        <button className="w-[50%] flex items-center justify-center">
          <MdOutlineFavoriteBorder className="mr-[10px]" />
          {`${post.favorite.length} Favorites`}
        </button>
        <button className="w-[50%] text-center">Comment</button>
      </div>
    </div>
  );
}
