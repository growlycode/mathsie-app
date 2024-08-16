import { withAuthenticationRequired } from "@auth0/auth0-react";
import { SubtleLoader } from "../components/site/loading";

export const AuthenticationGuard = ({ component }: any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <SubtleLoader />
  });

  return <Component />;
};
