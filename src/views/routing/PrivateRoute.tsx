import { SubtleLoader } from "../components/site/loading";

// PrivateRoute.js
import { PropsWithChildren } from "react";

import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";
import { auth } from "../../api/firebase-init";

export const PrivateRoute = ({ children }: PropsWithChildren) => {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <SubtleLoader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};