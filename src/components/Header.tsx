import Link from "next/link";

interface HeaderProps {
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showSideMenu: boolean;
  profile: string | undefined;
}

export default function Header({
  setShowSideMenu,
  showSideMenu,
  profile,
}: HeaderProps) {
  const clickHandler = () => {
    showSideMenu ? setShowSideMenu(false) : setShowSideMenu(true);
  };

  return (
    <div className="w-full bg-[#112D4E] flex items-center justify-between">
      <Link href={"/home"} className="flex items-center">
        <img
          src="/logo/logo-login.png"
          className="w-[70px] p-2 ml-[30px]"
        ></img>
        <p className="text-[20px] text-[#DBE2EF] font-[700]">TRAVEL N SHARE</p>
      </Link>
      {/* <input
        type="text"
        className="h-[40px] rounded-[10px] p-2 w-[300px] ml-[200px]"
        placeholder="What would you like to find?"
      /> */}
      <img
        src={profile}
        className="w-[40px] rounded-[50%] mr-[40px] hover:cursor-pointer"
        onClick={clickHandler}
      ></img>
    </div>
  );
}
