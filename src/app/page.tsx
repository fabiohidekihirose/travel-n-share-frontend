"use client";

import DescriptionAuth from "@/components/DescriptionAuth";
import { useEffect, useState } from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/AuthContext";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorText, setErrorText] = useState("");
  const userObj = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (userObj.user) {
      router.push("/home");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, error } = await signIn(formData.email, formData.password);

    if (error instanceof FirebaseError) {
      if (error.code === "auth/wrong-password") {
        setErrorText("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setErrorText("User not found");
      }
      return;
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
                required
              ></input>
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="rounded-[10px] p-2"
                onChange={handleChange}
                required
              />
              <a
                href="/forgot-password"
                className="hover:cursor-pointer underline mb-[15px]"
              >
                Forgot your password?
              </a>
              <p className="text-[#FF2D00]">{errorText}</p>
              <button className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 hover:bg-[#3F72AF] mb-[20px] mt-[15px] text-[20px] hover:shadow-[0_0_10px_rgb(63,114,175)]">
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
