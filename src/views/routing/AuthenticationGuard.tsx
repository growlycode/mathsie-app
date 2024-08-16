import { withAuthenticationRequired } from "@auth0/auth0-react";

const Authenticating = <div>Authenticating</div>;

export const AuthenticationGuard = ({ component }: any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => Authenticating
  });

  return <Component />;
};
