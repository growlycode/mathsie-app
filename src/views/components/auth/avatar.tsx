import { Tooltip } from 'flowbite-react';
import { auth } from '../../../api/firebase-init';
import { useAuth } from '../../../auth/hooks';

const Avatar = () => {

  const { user } = useAuth(auth);
  return (user &&  <Tooltip content={`Hi, ${user.displayName}`}>
    {(user.photoURL 
    ?<img className="h-[35px] rounded-[50%] hidden md:block" src={user.photoURL} />
    : user.displayName)}
      </Tooltip>
    );
};

export default Avatar; 