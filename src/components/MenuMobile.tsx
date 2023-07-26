import Link from "next/link";
import { MdOutlineFavoriteBorder, MdOutlineExplore } from "react-icons/md";
import {
  BsJournalRichtext,
  BsJournalPlus,
  BsJournalText,
} from "react-icons/bs";
import { useSearchParams } from "next/navigation";

export default function MenuMobile() {
  const searchParams = useSearchParams();
  const currPage = searchParams.get("page");

  return (
    <div className="fixed lg:hidden flex bottom-0 bg-[#DBE2EF] w-full">
      <Link
        href={"/home?page=feed"}
        className={`flex flex-col items-center w-[20%] py-2 rounded-[10px] text-[#112D4E] ${
          currPage === "feed" &&
          "text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)] bg-[#112D4E]"
        }`}
      >
        <BsJournalText size={25} />
        <p className="text-[20px] max-md:text-[11px]">Feed</p>
      </Link>
      <Link
        href={"/home?page=my-posts"}
        className={`flex flex-col items-center w-[20%] py-2 rounded-[10px] text-[#112D4E] ${
          currPage === "my-posts" &&
          "text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)] bg-[#112D4E]"
        }`}
      >
        <BsJournalRichtext size={25} />
        <p className="text-[20px] max-md:text-[11px]">My Posts</p>
      </Link>
      <Link
        href={"/home?page=new-post"}
        className={`flex flex-col items-center w-[20%] py-2 rounded-[10px] text-[#112D4E] ${
          currPage === "new-post" &&
          "text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)] bg-[#112D4E]"
        }`}
      >
        <BsJournalPlus size={25} />
        <p className="text-[20px] max-md:text-[11px]">New Post</p>
      </Link>
      <Link
        href={"/home?page=explore"}
        className={`flex flex-col items-center w-[20%] py-2 rounded-[10px] text-[#112D4E] ${
          currPage === "explore" &&
          "text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)] bg-[#112D4E]"
        }`}
      >
        <MdOutlineExplore size={25} />
        <p className="text-[20px] max-md:text-[11px]">Explore</p>
      </Link>
      <Link
        href={"/home?page=favorite"}
        className={`flex flex-col items-center w-[20%] py-2 rounded-[10px] text-[#112D4E] ${
          currPage === "favorite" &&
          "text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)] bg-[#112D4E]"
        }`}
      >
        <MdOutlineFavoriteBorder size={25} />
        <p className="text-[20px] max-md:text-[11px]">Favorite</p>
      </Link>
    </div>
  );
}
