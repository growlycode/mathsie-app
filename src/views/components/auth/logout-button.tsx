import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "../buttons/icon-button";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  
  return (isAuthenticated && <IconButton faClass="arrow-right-from-bracket fa-solid" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} />
  );
};

export default LogoutButton;