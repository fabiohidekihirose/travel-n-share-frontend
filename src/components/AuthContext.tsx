"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import axios from "axios";

const auth = getAuth(firebase_app);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext({});

export const useAuthContext = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userData = await axios.get(`${baseURL}/user/${user.uid}`);
          setUserInfo(userData.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
        setUserInfo({});
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userInfo }}>
      {loading ? (
        <div className="animate-[spin_1s_linear_infinite] w-[120px] h-[120px] rounded-[50%] border-[16px] border-[#f3f3f3] border-t-[16px] border-t-[#112D4E] mx-auto max-lg:mt-[50%] mt-[20%]"></div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
