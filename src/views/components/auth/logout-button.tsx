import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../buttons/icon-button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button className="py-2" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log out
    </Button>
  );
};

export default LogoutButton;