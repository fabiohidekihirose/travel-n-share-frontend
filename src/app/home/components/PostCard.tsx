interface PostCardProps {
  content: string;
}

export default function PostCard({ content }: PostCardProps) {
  return (
    <div className="flex flex-col space-y-[10px] bg-[#3F72AF] p-6 rounded-[10px]">
      <div className="flex items-center space-x-[10px]">
        <img
          src="/images/profile-hideki.png"
          alt="profile-picture"
          className="rounded-[50%] w-[50px]"
        />
        <div className="flex flex-col">
          <p>Username</p>
          <p>TimeStamp</p>
        </div>
      </div>
      <hr className="bg-[#3F72AF]"></hr>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}
