import firebase_app from "./config";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function updateUser(email: string, password: string) {
  let resultEmail = null;
  let resultPassword = null;
  let error = null;

  try {
    if (email && auth.currentUser) {
      resultEmail = await updateEmail(auth.currentUser, email);
    }

    if (password && auth.currentUser) {
      resultPassword = await updatePassword(auth.currentUser, password);
    }
  } catch (e) {
    error = e;
  }

  return { resultEmail, resultPassword, error };
}
