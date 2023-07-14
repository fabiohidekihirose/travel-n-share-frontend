"use client";

import DescriptionAuth from "@/components/DescriptionAuth";
import { useState } from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const userObj = useAuthContext();
  const router = useRouter();

  if (userObj.user) {
    router.push("/home");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn(formData.email, formData.password);

    if (error) {
      setError(error);
      return console.log(error);
    } else {
      router.push("/home");
    }
  };

  return (
    <main className="flex max-lg:flex-col min-h-screen items-center bg-[#112D4E] text-[#112D4E] px-10">
      {userObj.user ? null : (
        <>
          <DescriptionAuth />
          <div className="border-[1px] max-lg:my-[50px] p-10 m-auto rounded-[10px] bg-[#DBE2EF] shadow-[0_0_30px_rgb(63,114,175)] max-w-[400px]">
            <h1 className="font-[600] text-[40px]">Welcome Back!</h1>
            <h2 className="mb-[20px]">Please, enter your details to login</h2>
            <form className="flex flex-col" onSubmit={handleForm}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="mb-[20px] rounded-[10px] p-2"
                onChange={handleChange}
              ></input>
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="rounded-[10px] p-2"
                onChange={handleChange}
              />
              <a
                href="/forgot-password"
                className="hover:cursor-pointer underline mb-[30px]"
              >
                Forgot your password?
              </a>
              <button className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 hover:bg-[#3F72AF] mb-[20px] text-[20px] hover:shadow-[0_0_10px_rgb(63,114,175)]">
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
        </>
      )}
    </main>
  );
}
