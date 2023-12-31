"use client";

import Header from "@/components/Header";
import { MdOutlineFavoriteBorder, MdOutlineExplore } from "react-icons/md";
import {
  BsJournalRichtext,
  BsJournalPlus,
  BsJournalText,
} from "react-icons/bs";
import Feed from "./components/posts/Feed";
import FollowPage from "./components/follow/FollowPage";
import MyPosts from "./components/posts/MyPosts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import FavoritePosts from "./components/posts/FavoritePosts";
import NewPost from "./components/posts/NewPost";
import ProfilePage from "./components/account/ProfilePage";
import EditAccount from "./components/account/EditAccount";
import EditProfile from "./components/account/EditProfile";
import ExplorePage from "./components/posts/ExplorePage";
import MenuMobile from "@/components/MenuMobile";

export interface UserProps {
  email: string;
  full_name: string;
  username: string;
  image: string;
  bio: string;
  posts: {}[];
  followers: FollowProps[];
  following: FollowProps[];
}

export interface FollowProps {
  user_id_ed: string;
}

export default function Home() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [currUser, setCurrUser] = useState<UserProps | null>(null);
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
        const user = await axios.get(`${baseURL}/user/${userObj.user.uid}`);
        setCurrUser(user.data);
      };
      getUserInfo();
    }
  }, [userObj]);

  return (
    <div
      className="h-full bg-[#112D4E]"
      onClick={() => (showSideMenu ? setShowSideMenu(false) : null)}
    >
      <Header
        setShowSideMenu={setShowSideMenu}
        showSideMenu={showSideMenu}
        profile={currUser?.image}
      />
      {showSideMenu && <SideMenu />}
      {currUser && (
        <div className="flex">
          <div className="flex flex-col w-[300px] m-[32px] mt-[102px] space-y-[30px] lg:fixed max-lg:hidden">
            <div className="bg-[#DBE2EF] h-fit p-4 rounded-[10px] space-y-[20px] text-[#112D4E]">
              <div className="flex items-center space-x-[10px]">
                <img
                  src={currUser.image}
                  className="rounded-[50%] w-[70px] border-[2px] border-[#112D4E]"
                ></img>
                <div>
                  <Link
                    href={`/home?page=profile&user_id=${userObj.user.uid}&section=posts`}
                    className="font-[700] text-[20px]"
                  >
                    {currUser.full_name}
                  </Link>
                  <p className="font-[200]">@{currUser.username}</p>
                </div>
              </div>
              <div className="flex justify-between px-2">
                <Link
                  href={`/home?page=followers&user_id=${userObj.user.uid}`}
                  className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
                >
                  <p className="font-[700] text-[20px]">
                    {currUser.followers.length}
                  </p>
                  <p className="font-[200]">Followers</p>
                </Link>
                <Link
                  href={`/home?page=following&user_id=${userObj.user.uid}`}
                  className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
                >
                  <p className="font-[700] text-[20px]">
                    {currUser.following.length}
                  </p>
                  <p className="font-[200]">Following</p>
                </Link>
                <Link
                  href={"/home?page=my-posts"}
                  data-testid={"posts-button"}
                  className="text-center border-b-[3px] border-[#DBE2EF] hover:border-[#112D4E]"
                >
                  <p className="font-[700] text-[20px]">
                    {currUser.posts.length}
                  </p>
                  <p className="font-[200]">Posts</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-4 space-y-[10px] bg-[#DBE2EF] rounded-[10px]">
              <Link
                href={"/home?page=feed"}
                className={`flex space-x-[10px] items-center px-4 py-2 rounded-[10px] hover:bg-[#112D4E] text-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] ${
                  (currPage === "feed" || !currPage) &&
                  "shadow-[0_0_10px_rgb(17,45,78)] text-[#DBE2EF] bg-[#112D4E]"
                }`}
              >
                <BsJournalText size={25} />
                <p className="text-[20px]">Feed</p>
              </Link>
              <Link
                href={"/home?page=new-post"}
                className={`flex space-x-[10px] items-center px-4 py-2 rounded-[10px] hover:bg-[#112D4E] text-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] ${
                  currPage === "new-post" &&
                  "shadow-[0_0_10px_rgb(17,45,78)] text-[#DBE2EF] bg-[#112D4E]"
                }`}
              >
                <BsJournalPlus size={25} />
                <p className="text-[20px]">New Post</p>
              </Link>
              <Link
                href={"/home?page=my-posts"}
                className={`flex space-x-[10px] items-center px-4 py-2 rounded-[10px] hover:bg-[#112D4E] text-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] ${
                  currPage === "my-posts" &&
                  "shadow-[0_0_10px_rgb(17,45,78)] text-[#DBE2EF] bg-[#112D4E]"
                }`}
              >
                <BsJournalRichtext size={25} />
                <p className="text-[20px]">My Posts</p>
              </Link>
              <Link
                href={"/home?page=explore"}
                className={`flex space-x-[10px] items-center px-4 py-2 rounded-[10px] hover:bg-[#112D4E] text-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] ${
                  currPage === "explore" &&
                  "shadow-[0_0_10px_rgb(17,45,78)] text-[#DBE2EF] bg-[#112D4E]"
                }`}
              >
                <MdOutlineExplore size={25} />
                <p className="text-[20px]">Explore</p>
              </Link>
              <Link
                href={"/home?page=favorite"}
                className={`flex space-x-[10px] items-center px-4 py-2 rounded-[10px] hover:bg-[#112D4E] text-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] ${
                  currPage === "favorite" &&
                  "shadow-[0_0_10px_rgb(17,45,78)] text-[#DBE2EF] bg-[#112D4E]"
                }`}
              >
                <MdOutlineFavoriteBorder size={25} />
                <p className="text-[20px]">Favorite</p>
              </Link>
            </div>
          </div>
          <div className="w-full mt-[70px] max-lg:mb-[70px] lg:ml-[364px] text-[#112D4E] space-y-[20px] lg:mr-[30px] p-2 pt-8 max-lg:mx-[15px]">
            {(currPage === "feed" || !currPage) && (
              <Feed followingUsers={currUser.following} data-testid={"feed"} />
            )}
            {(currPage === "followers" || currPage === "following") && (
              <FollowPage />
            )}
            {currPage === "my-posts" && <MyPosts data-testid={"my-posts"} />}
            {currPage === "favorite" && <FavoritePosts />}
            {currPage === "new-post" && <NewPost currUser={currUser} />}
            {currPage === "profile" && (
              <ProfilePage followingUsers={currUser.following} />
            )}
            {currPage === "account" && <EditAccount email={currUser.email} />}
            {currPage === "edit-profile" && (
              <EditProfile
                full_name={currUser.full_name}
                username={currUser.username}
                bio={currUser.bio}
              />
            )}
            {currPage === "explore" && (
              <ExplorePage followingUsers={currUser.following} />
            )}
          </div>
          <MenuMobile />
        </div>
      )}
    </div>
  );
}
