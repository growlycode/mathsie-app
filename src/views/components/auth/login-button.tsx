import { auth } from "../../../api/firebase-init";
import { goToLogin } from "../../../api/login";
import { IconButton } from "../buttons/icon-button";

const LoginButton = () => {
  const isAuthenticated = auth.currentUser;
  return (!isAuthenticated && <IconButton faClass="arrow-right-from-bracket fa-solid" onClick={goToLogin} text="Login"/>
  );
};

export default LoginButton;