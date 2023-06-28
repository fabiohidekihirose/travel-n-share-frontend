export default function Home() {
  return (
    <main className="flex max-lg:flex-col min-h-screen items-center bg-[#112D4E] text-[#112D4E]">
      <div className="flex flex-col max-w-[500px] lg:ml-[120px] mx-[40px] max-lg:mt-[50px]">
        <div className="flex items-center space-x-[10px] mb-[20px]">
          <img src="/logo-login.png" className="w-[70px] md:w-[100px]"></img>
          <p className="md:text-[40px] text-[25px] text-[#DBE2EF] font-[700]">
            TRAVEL N SHARE
          </p>
        </div>
        <p className="text-[#DBE2EF] text-[15px]">
          A vibrant social network designed exclusively for adventurous
          travelers to connect and exchange their remarkable journeys from
          around the globe
        </p>
      </div>
      <div className="border-[1px] max-lg:mt-[50px] p-6 m-auto rounded-[10px] bg-[#DBE2EF] shadow-[5px_10px_30px_rgb(63,114,175)] max-w-[400px]">
        <h1 className="font-[600] text-[40px]">Welcome Back!</h1>
        <h2 className="mb-[20px]">Please, enter your details to login</h2>
        <form className="flex flex-col">
          <label>Email</label>
          <input type="email" className="mb-[20px] rounded-[10px] p-2"></input>
          <label>Password</label>
          <input type="password" className="rounded-[10px] p-2" />
          <a
            href="/forgot-password"
            className="hover:cursor-pointer underline mb-[30px]"
          >
            Forgot your password?
          </a>
          <button className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 hover:bg-[#3F72AF] mb-[20px] text-[20px]">
            Login
          </button>
        </form>
        <div>
          Don't have an account?{" "}
          <a href="/sign-up" className="underline ">
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
}
