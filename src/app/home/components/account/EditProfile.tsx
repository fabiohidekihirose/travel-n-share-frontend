import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/components/AuthContext";

interface EditAccountProps {
  full_name: string;
  username: string;
  bio: string;
}

export default function EditProfile({
  full_name,
  username,
  bio,
}: EditAccountProps) {
  const [formData, setFormData] = useState({
    full_name,
    username,
    bio,
  });
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const router = useRouter();
  const userObj = useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleEditFullNameButton = () => {
    setEditFullName(true);
  };

  const handleEditUsernameButton = () => {
    setEditUsername(true);
  };

  const handleEditBioButton = () => {
    setEditBio(true);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateButtonEnabled(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.patch(`${baseURL}/user/${userObj.user.uid}/update`, formData);

    router.push("/home?page=feed");
  };

  return (
    <div className="bg-[#DBE2EF] rounded-[10px] p-8">
      <h2 className="text-center font-[700] text-[30px] mb-[20px]">Profile</h2>
      <form className="flex flex-col" onSubmit={handleForm}>
        <label>Full Name</label>
        <div className="flex justify-between mb-[10px]">
          <input
            name="full_name"
            type="text"
            className="rounded-[10px] p-2 w-[70%]"
            onChange={handleChange}
            defaultValue={full_name}
            disabled={!editFullName}
          ></input>
          <button
            type="button"
            className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 w-[100px]"
            onClick={handleEditFullNameButton}
          >
            Edit
          </button>
        </div>
        <label>Username</label>
        <div className="flex justify-between mb-[30px]">
          <input
            name="username"
            type="text"
            className="rounded-[10px] p-2 w-[70%]"
            onChange={handleChange}
            defaultValue={username}
            disabled={!editUsername}
          />
          <button
            type="button"
            className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 w-[100px]"
            onClick={handleEditUsernameButton}
          >
            Edit
          </button>
        </div>
        <label>Bio</label>
        <div className="flex justify-between mb-[30px]">
          <textarea
            name="bio"
            className="rounded-[10px] p-2 w-[70%]"
            onChange={handleChange}
            defaultValue={bio}
            disabled={!editBio}
          />
          <button
            type="button"
            className="bg-[#112D4E] rounded-[10px] text-[#F9F7F7] p-2 w-[100px] h-min"
            onClick={handleEditBioButton}
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
