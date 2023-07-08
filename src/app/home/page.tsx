"use client";

import Header from "@/components/Header";
import { PiNewspaperLight } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineExplore } from "react-icons/md";
import Feed from "./components/Feed";
import FollowPage from "./components/FollowPage";
import MyPosts from "./components/MyPosts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  full_name: string;
  username: string;
  image: string;
  posts: {}[];
  followers: {}[];
  following: {}[];
}

export default function Home() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const currPage = searchParams.get("page");
  const userObj = useAuthContext();
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!userObj.user) {
      router.push("/");
    } else {
      const getUserInfo = async () => {
        const userId = userObj.user.uid;

        const user = await axios.get(`${baseURL}/user/${userId}`);
        setCurrUser(user.data);
      };
      getUserInfo();
    }
  }, []);

  return (
    <div className="h-full bg-[#112D4E]">
      <Header setShowSideMenu={setShowSideMenu} showSideMenu={showSideMenu} />
      {showSideMenu && <SideMenu />}
      {currUser && (
        <div className="flex">
          <div className="flex flex-col w-[300px] m-[30px]">
            <div className="bg-[#DBE2EF] h-fit p-4 rounded-[10px] space-y-[20px] w-[300px] shadow-[0_0_20px_rgb(63,114,175)] text-[#112D4E]">
              <div className="flex items-center space-x-[10px]">
                <img
                  src={currUser.image}
                  className="rounded-[50%] w-[70px]"
                ></img>
                <div>
                  <p className="font-[700]">{currUser.full_name}</p>
                  <p className="font-[500]">{currUser.username}</p>
                </div>
              </div>
              <div className="flex justify-between px-2">
                <Link
                  href={"/home?page=followers"}
                  className="text-center hover:drop-shadow-[0_0_5px_rgb(63,114,175)]"
                >
                  <p>{currUser.followers.length}</p>
                  <p className="font-[700]">Followers</p>
                </Link>
                <Link
                  href={"/home?page=following"}
                  className="text-center hover:drop-shadow-[0_0_5px_rgb(63,114,175)]"
                >
                  <p>{currUser.following.length}</p>
                  <p className="font-[700]">Following</p>
                </Link>
                <Link
                  href={"/home?page=my-posts"}
                  className="text-center hover:drop-shadow-[0_0_5px_rgb(63,114,175)]"
                >
                  <p>{currUser.posts.length}</p>
                  <p className="font-[700]">Posts</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-4 pt-8 space-y-[10px]">
              <Link
                href={"/home?page=feed"}
                className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px] hover:bg-[#DBE2EF] text-[#DBE2EF] hover:text-[#112D4E] hover:fill-[#112D4E]"
              >
                <PiNewspaperLight size={25} />
                <p className="text-[20px]">Feed</p>
              </Link>
              <Link
                href={"/home?page=explore"}
                className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px] hover:bg-[#DBE2EF] text-[#DBE2EF] hover:text-[#112D4E] hover:fill-[#112D4E]"
              >
                <MdOutlineExplore size={25} />
                <p className="text-[20px]">Explore</p>
              </Link>
              <Link
                href={"/home?page=my-posts"}
                className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px] hover:bg-[#DBE2EF] text-[#DBE2EF] hover:text-[#112D4E] hover:fill-[#112D4E]"
              >
                <MdOutlineExplore size={25} />
                <p className="text-[20px]">My Posts</p>
              </Link>
              <Link
                href={"/home?page=favorite"}
                className="flex space-x-[10px] items-center border-[1px] border-[#112D4E] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px] hover:bg-[#DBE2EF] text-[#DBE2EF] hover:text-[#112D4E] hover:fill-[#112D4E]"
              >
                <MdOutlineFavoriteBorder size={25} />
                <p className="text-[20px]">Favorite</p>
              </Link>
            </div>
          </div>
          {(currPage === "feed" || !currPage) && <Feed />}
          {(currPage === "followers" || currPage === "following") && (
            <FollowPage />
          )}
          {currPage === "my-posts" && <MyPosts />}
        </div>
      )}
    </div>
  );
}
