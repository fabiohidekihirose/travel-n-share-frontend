"use client";

import Header from "@/components/Header";
import { PiNewspaperLight } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineExplore } from "react-icons/md";
import Feed from "./components/Feed";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const searchParams = useSearchParams();
  const currPage = searchParams.get("page");
  const user = useAuthContext();
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!user.user) {
      router.push("/");
    }
    (async () => {
      const data = { uid: "test123" };
      const user = await axios.post(`${baseURL}/auth`, data);

      console.log("here", user.data);
    })();
  }, []);

  return (
    <div className="h-full bg-[#112D4E]">
      <Header setShowSideMenu={setShowSideMenu} showSideMenu={showSideMenu} />
      {showSideMenu && <SideMenu />}
      <div className="flex">
        <div className="flex flex-col w-[300px] m-[30px]">
          <div className="bg-[#3F72AF] h-fit p-4 rounded-[10px] space-y-[20px] w-[300px] shadow-[0_0_20px_rgb(63,114,175)] text-[#DBE2EF]">
            <div className="flex items-center space-x-[10px]">
              <img
                src="/images/profile-hideki.png"
                className="rounded-[50%] w-[70px]"
              ></img>
              <div>
                <p className="font-[700]">Name</p>
                <p className="font-[500]">Username</p>
              </div>
            </div>
            <div className="flex justify-between px-2">
              <Link href={"/home?page=followers"} className="text-center">
                <p>12312</p>
                <p className="font-[700]">Followers</p>
              </Link>
              <Link href={"/home?page=following"} className="text-center">
                <p>12312</p>
                <p className="font-[700]">Following</p>
              </Link>
              <Link href={"/home?page=posts"} className="text-center">
                <p>123</p>
                <p className="font-[700]">Posts</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col p-4 pt-8 space-y-[10px]">
            <Link
              href={"/home?page=feed"}
              className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
            >
              <PiNewspaperLight color="#DBE2EF" size={25} />
              <p className="text-[#DBE2EF] text-[20px]">Feed</p>
            </Link>
            <Link
              href={"/home?page=explore"}
              className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
            >
              <MdOutlineExplore color="#DBE2EF" size={25} />
              <p className="text-[#DBE2EF] text-[20px]">Explore</p>
            </Link>
            <Link
              href={"/home?page=my-posts"}
              className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
            >
              <MdOutlineExplore color="#DBE2EF" size={25} />
              <p className="text-[#DBE2EF] text-[20px]">My Posts</p>
            </Link>
            <Link
              href={"/home?page=favorite"}
              className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
            >
              <MdOutlineFavoriteBorder color="#DBE2EF" size={25} />
              <p className="text-[#DBE2EF] text-[20px]">Favorite</p>
            </Link>
          </div>
        </div>
        {(currPage === "feed" || !currPage) && <Feed />}
      </div>
    </div>
  );
}
