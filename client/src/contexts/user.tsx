/* eslint-disable react-refresh/only-export-components */

import {
  Call,
  StreamVideoClient,
  User as StreamUserType,
} from '@stream-io/video-react-sdk';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'universal-cookie';

interface User {
  username: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  client?: StreamVideoClient;
  setClient: (client?: StreamVideoClient) => void;
  call?: Call;
  setCall: (call?: Call) => void;
  isLoadingClient: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const cookies = new Cookies();

  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [isLoadingClient, setIsLoadingClient] = useState<boolean>(true);

  useEffect(() => {
    const token = cookies.get('token');
    const username = cookies.get('username');
    const name = cookies.get('name');

    if (!token || !username || !name) {
      setIsLoadingClient(false);
      return;
    }

    const user: StreamUserType = {
      id: username,
      name,
    };
    const myClient = new StreamVideoClient({
      apiKey: import.meta.env.VITE_STREAM_API_KEY,
      user,
      token,
    });

    setClient(myClient);
    setUser({ username, name });
    setIsLoadingClient(false);

    return () => {
      myClient.disconnectUser();
      setClient(undefined);
      setUser(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        client,
        setClient,
        call,
        setCall,
        isLoadingClient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
