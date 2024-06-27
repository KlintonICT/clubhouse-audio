import { StreamVideo } from '@stream-io/video-react-sdk';
import CryptoJs from 'crypto-js';
import { ChangeEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';

interface NewRoom {
  name: string;
  description: string;
}

export const MainPage = () => {
  const navigate = useNavigate();
  const { client, user, setCall, isLoadingClient } = useUserContext();
  const [newRoom, setNewRoom] = useState<NewRoom>({
    name: '',
    description: '',
  });

  const getHashRoomName = (roomName: string): string => {
    const hash = CryptoJs.SHA256(roomName).toString(CryptoJs.enc.Base64);

    return hash.replace(/[^a-zA-Z0-9_-]/g, '');
  };

  const handleCreateRoom = async () => {
    const { name, description } = newRoom;

    if (!client || !user || !name || !description) return;

    const call = client.call('audio_room', getHashRoomName(name));
    await call.join({
      create: true,
      data: {
        members: [{ user_id: user.username }],
        custom: {
          title: name,
          description,
        },
      },
    });

    setCall(call);
    navigate('/room');
  };

  if (isLoadingClient) return <h1>...</h1>;

  if (!isLoadingClient && (!user || !client)) return <Navigate to='/sign-in' />;

  return (
    <StreamVideo client={client!}>
      <div className='home'>
        <h1>Welcome, {user?.name}</h1>
        <div className='form' style={{ alignItems: 'center' }}>
          <h2>Create Your Own Room</h2>
          <input
            placeholder='Room Name...'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewRoom((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <input
            placeholder='Room Description...'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewRoom((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
          />
          <button
            onClick={handleCreateRoom}
            style={{ backgroundColor: 'rgb(125, 7, 236', width: '100%' }}
          >
            Create Room
          </button>
        </div>
      </div>
    </StreamVideo>
  );
};
