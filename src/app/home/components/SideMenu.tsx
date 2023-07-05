import Link from "next/link";
import { MdOutlineExplore, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import logOut from "@/firebase/auth/logOut";
import { useRouter } from "next/navigation";

export default function SideMenu() {
  const router = useRouter();

  const logoutHandler = async () => {
    await logOut();

    router.push("/");
  };

  return (
    <div className="absolute right-[20px] bg-[#3F72AF] rounded-[10px] p-4 space-y-[10px]">
      <Link
        href={"/profile"}
        className="flex space-x-[10px] items-center border-[1px] border-[#3F72AF] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
      >
        <CgProfile color="#DBE2EF" size={25} />
        <p className="text-[#DBE2EF] text-[20px]">Profile</p>
      </Link>
      <Link
        href={"/account"}
        className="flex space-x-[10px] items-center border-[1px] border-[#3F72AF] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
      >
        <MdOutlineExplore color="#DBE2EF" size={25} />
        <p className="text-[#DBE2EF] text-[20px]">Account</p>
      </Link>
      <button
        className="flex space-x-[10px] items-center border-[1px] border-[#3F72AF] hover:border-[#DBE2EF] hover:shadow-[0_0_10px_rgb(219,226,239)] px-4 py-2 rounded-[10px]"
        onClick={logoutHandler}
      >
        <MdLogout color="#DBE2EF" size={25} />
        <p className="text-[#DBE2EF] text-[20px]">Log Out</p>
      </button>
    </div>
  );
}
