"use client";

import DescriptionAuth from "@/components/DescriptionAuth";
import { useState } from "react";
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    username: "",
    password: "",
  });
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, error } = await signUp(formData.email, formData.password);

    if (error) {
      return console.log(error);
    } else {
      const payload = {
        id: result?.user.uid,
        email: formData.email,
        full_name: formData.full_name,
        username: formData.username,
        image: "/images/profile-default.png",
        bio: "",
      };
      await axios.post(`${baseURL}/register`, payload);

      router.push("/");
    }
  };

  return (
    <div className="flex max-lg:flex-col min-h-screen items-center bg-[#112D4E] text-[#112D4E]">
      <DescriptionAuth />
      <div className="border-[1px] max-lg:mt-[50px] p-10 m-auto mb-[50px] rounded-[10px] bg-[#DBE2EF] shadow-[5px_10px_30px_rgb(63,114,175)] max-w-[400px]">
        <h1 className="font-[600] text-[40px]">Sign Up</h1>
        <h2 className="mb-[20px]">Create an account to use Travel N Share</h2>
        <form className="flex flex-col" onSubmit={handleForm}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="mb-[20px] rounded-[10px] p-2"
            onChange={handleChange}
          ></input>
          <label>Full Name</label>
          <input
            name="full_name"
            type="text"
            className="mb-[20px] rounded-[10px] p-2"
            onChange={handleChange}
          ></input>
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="mb-[20px] rounded-[10px] p-2"
            onChange={handleChange}
          ></input>
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="mb-[30px] rounded-[10px] p-2"
            onChange={handleChange}
          />
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
