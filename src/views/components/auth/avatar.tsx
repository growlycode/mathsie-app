import { useAuth0 } from "@auth0/auth0-react";

const Avatar = () => {
  const { user } = useAuth0();
  return (user && <img className="h-[45px] rounded-[50%] hidden md:block" src={user.picture} />);
};

export default Avatar; 