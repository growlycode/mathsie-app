import { auth } from "../../../api/firebase-init";
import { IconButton } from "../buttons/icon-button";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

const LogoutButton = () => {

  const [user] = useAuthState(auth);
  
  return (user && <IconButton faClass="arrow-right-from-bracket fa-solid" onClick={() => signOut(auth)} />
  );
};

export default LogoutButton;