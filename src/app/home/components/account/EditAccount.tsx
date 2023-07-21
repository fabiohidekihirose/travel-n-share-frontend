import { useState } from "react";
import { useRouter } from "next/navigation";
import updateUser from "@/firebase/updateUser";
import axios from "axios";
import { useAuthContext } from "@/components/AuthContext";

interface EditAccountProps {
  email: string;
}

export default function EditAccount({ email }: EditAccountProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const router = useRouter();
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleEditEmailButton = () => {
    setEditEmail(true);
  };

  const handleEditPasswordButton = () => {
    setEditPassword(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateButtonEnabled(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await updateUser(formData.email, formData.password);

    if (error) {
      return console.log(error);
    } else {
      if (formData.email) {
        await axios.patch(`${baseURL}/user/${userObj.user.uid}/update`, {
          email: formData.email,
        });
      }
      router.push("/home?page=feed");
    }
  };

  return (
    <div className="bg-[#DBE2EF] rounded-[10px] p-8">
      <h2 className="text-center font-[700] text-[30px] mb-[20px]">
        Account Settings
      </h2>
      <form className="flex flex-col" onSubmit={handleForm}>
        <label>Email</label>
        <div className="flex justify-between mb-[10px]">
          <input
            name="email"
            type="email"
            className="rounded-[10px] p-2 w-[70%]"
            onChange={handleChange}
            defaultValue={email}
            disabled={!editEmail}
          ></input>
          <button
            type="button"
            className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 w-[100px]"
            onClick={handleEditEmailButton}
          >
            Edit
          </button>
        </div>
        <label>Password</label>
        <div className="flex justify-between mb-[30px]">
          <input
            name="password"
            type="password"
            className="rounded-[10px] p-2 w-[70%]"
            onChange={handleChange}
            disabled={!editPassword}
          />
          <button
            type="button"
            className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 w-[100px]"
            onClick={handleEditPasswordButton}
          >
            Edit
          </button>
        </div>
        <button
          type="submit"
          className={`rounded-[10px] text-[#F9F7F7] p-2 ${
            updateButtonEnabled
              ? "bg-[#112D4E] hover:bg-[#3F72AF]"
              : "bg-[#3F72AF]"
          } text-[20px]`}
          disabled={!updateButtonEnabled}
        >
          Update Account Settings
        </button>
      </form>
    </div>
  );
}
