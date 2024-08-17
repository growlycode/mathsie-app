import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../api/firebase-init';

const Avatar = () => {

  const [user] = useAuthState(auth);
  return (user && (user.photoURL 
    ? <img className="h-[45px] rounded-[50%] hidden md:block" src={user.photoURL} />
    : user.displayName));
};

export default Avatar; 