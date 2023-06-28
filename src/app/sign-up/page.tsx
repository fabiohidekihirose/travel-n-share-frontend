import DescriptionAuth from "@/components/DescriptionAuth";

export default function SignUp() {
  return (
    <div className="flex max-lg:flex-col min-h-screen items-center bg-[#112D4E] text-[#112D4E]">
      <DescriptionAuth />
      <div className="border-[1px] max-lg:mt-[50px] p-10 m-auto mb-[50px] rounded-[10px] bg-[#DBE2EF] shadow-[5px_10px_30px_rgb(63,114,175)] max-w-[400px]">
        <h1 className="font-[600] text-[40px]">Sign Up</h1>
        <h2 className="mb-[20px]">Create an account to use Travel N Share</h2>
        <form className="flex flex-col">
          <label>Email</label>
          <input type="email" className="mb-[20px] rounded-[10px] p-2"></input>
          <label>Name</label>
          <input type="text" className="mb-[20px] rounded-[10px] p-2"></input>
          <label>Username</label>
          <input type="text" className="mb-[20px] rounded-[10px] p-2"></input>
          <label>Password</label>
          <input type="password" className="mb-[30px] rounded-[10px] p-2" />
          <button className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 hover:bg-[#3F72AF] mb-[20px] text-[20px]">
            Sign Up
          </button>
        </form>
        <div>
          Already have an account?{" "}
          <a href="/" className="underline ">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
