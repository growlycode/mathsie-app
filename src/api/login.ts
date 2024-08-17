import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-init";

export interface LoginProps {
  email: string,
  password: string
}

export const login = ({ email, password }: LoginProps) => {

  return signInWithEmailAndPassword(auth, email, password);
}

export const goToLogin = () => {

}