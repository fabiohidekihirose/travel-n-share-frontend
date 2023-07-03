import PostCard from "./../components/PostCard";
import dummyData from "../../dummyData";

export default function Feed() {
  return (
    <div className="w-[800px] h-[80vh] rounded-[10px] mt-[30px] overflow-y-scroll text-[#DBE2EF] space-y-[20px]">
      {dummyData &&
        dummyData.map((data) => <PostCard content={data.content} />)}
    </div>
  );
}
