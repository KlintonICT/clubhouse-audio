/* eslint-disable react-refresh/only-export-components */

import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface User {
  username: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  client?: StreamVideoClient;
  setClient: (client?: StreamVideoClient) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();

  return (
    <UserContext.Provider value={{ user, setUser, client, setClient }}>
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
