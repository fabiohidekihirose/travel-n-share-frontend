import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import logOut from "@/firebase/auth/logOut";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function SideMenu() {
  const userObj = useAuthContext();
  const router = useRouter();

  const logoutHandler = async () => {
    await logOut();

    router.push("/");
  };

  return (
    <div className="fixed right-[20px] top-[60px] bg-[#DBE2EF] text-[#112D4E] rounded-[10px] p-4 space-y-[10px] shadow-[0_0_10px_rgb(63,114,175)]">
      <Link
        href={`/home?page=profile&user_id=${userObj.user.uid}`}
        className="flex space-x-[10px] items-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] px-4 py-2 rounded-[10px]"
      >
        <CgProfile size={25} />
        <p className="text-[20px]">Profile</p>
      </Link>
      <Link
        href={"/home?page=account"}
        className="flex space-x-[10px] items-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] px-4 py-2 rounded-[10px]"
      >
        <AiOutlineSetting size={25} />
        <p className="text-[20px]">Account</p>
      </Link>
      <Link
        href={"/"}
        className="flex space-x-[10px] items-center hover:bg-[#112D4E] hover:text-[#DBE2EF] hover:shadow-[0_0_10px_rgb(17,45,78)] px-4 py-2 rounded-[10px]"
        onClick={logoutHandler}
      >
        <MdLogout size={25} />
        <p className="text-[20px]">Log Out</p>
      </Link>
    </div>
  );
}
