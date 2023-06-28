export default function Header() {
  return (
    <div className="w-full bg-[#112D4E] flex items-center">
      <div className="flex items-center">
        <img
          src="/logo/logo-login.png"
          className="w-[70px] p-2 ml-[30px]"
        ></img>
        <p className="text-[20px] text-[#DBE2EF] font-[700]">TRAVEL N SHARE</p>
      </div>
      <input
        type="text"
        className="h-[40px] rounded-[10px] p-2 w-[300px] ml-[200px]"
        placeholder="What would you like to find?"
      />
    </div>
  );
}
