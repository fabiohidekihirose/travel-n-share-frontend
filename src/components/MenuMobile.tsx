import Link from "next/link";
import { MdOutlineFavoriteBorder, MdOutlineExplore } from "react-icons/md";
import {
  BsJournalRichtext,
  BsJournalPlus,
  BsJournalText,
} from "react-icons/bs";

export default function MenuMobile() {
  return (
    <div className="fixed lg:hidden flex bottom-0 bg-[#DBE2EF] w-full justify-between">
      <Link
        href={"/home?page=feed"}
        className="flex flex-col items-center px-4 py-2 rounded-[10px] text-[#112D4E]"
      >
        <BsJournalText size={25} />
        <p className="text-[20px] max-md:text-[11px]">Feed</p>
      </Link>
      <Link
        href={"/home?page=my-posts"}
        className="flex flex-col items-center px-4 py-2 rounded-[10px] text-[#112D4E]"
      >
        <BsJournalRichtext size={25} />
        <p className="text-[20px] max-md:text-[11px]">My Posts</p>
      </Link>
      <Link
        href={"/home?page=new-post"}
        className="flex flex-col items-center px-4 py-2 rounded-[10px] bg-[#112D4E] text-[#DBE2EF] shadow-[0_0_10px_rgb(17,45,78)]"
      >
        <BsJournalPlus size={25} />
        <p className="text-[20px] max-md:text-[11px]">New Post</p>
      </Link>
      <Link
        href={"/home?page=explore"}
        className="flex flex-col items-center px-4 py-2 rounded-[10px] text-[#112D4E]"
      >
        <MdOutlineExplore size={25} />
        <p className="text-[20px] max-md:text-[11px]">Explore</p>
      </Link>
      <Link
        href={"/home?page=favorite"}
        className="flex flex-col items-center px-4 py-2 rounded-[10px] text-[#112D4E]"
      >
        <MdOutlineFavoriteBorder size={25} />
        <p className="text-[20px] max-md:text-[11px]">Favorite</p>
      </Link>
    </div>
  );
}
