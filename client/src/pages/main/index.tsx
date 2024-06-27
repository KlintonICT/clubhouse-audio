import { StreamVideo } from '@stream-io/video-react-sdk';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';

export const MainPage = () => {
  const { client } = useUserContext();

  if (!client) return <Navigate to='/sign-in' />;

  return (
    <StreamVideo client={client}>
      <div>Main Page</div>
    </StreamVideo>
  );
};
