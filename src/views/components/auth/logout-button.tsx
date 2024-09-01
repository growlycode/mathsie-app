import { auth } from "../../../api/firebase-init";
import { signOut } from "firebase/auth";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../../auth/hooks";

const LogoutButton = () => {

  const { user } = useAuth(auth);

  return (user && <button type="button" onClick={() => signOut(auth)}
    className={`rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700`}>
    <HiLogout className="h-5 w-5" />
  </button>
  );
};

export default LogoutButton;