import Link from "next/link";

interface CommentCardProps {
  image: string;
  username: string;
  content: string;
  user_id: string;
}

export default function CommentCard({
  image,
  username,
  content,
  user_id,
}: CommentCardProps) {
  return (
    <div className="flex space-x-[10px]">
      <img src={image} className="w-[50px] h-[50px] rounded-[50%]"></img>
      <div className="bg-[#112D4E] rounded-[10px] grow text-[#DBE2EF] p-4 space-y-[15px]">
        <Link
          href={`/home?page=profile&user_id=${user_id}`}
          className="font-[700]"
        >
          {username}
        </Link>
        <div>{content}</div>
      </div>
    </div>
  );
}
