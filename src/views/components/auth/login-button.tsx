import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "../buttons/icon-button";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (!isAuthenticated && <IconButton faClass="arrow-right-from-bracket fa-solid" onClick={loginWithRedirect} text="Login"/>
  );
};

export default LoginButton;