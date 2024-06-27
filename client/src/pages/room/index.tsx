import {
  OwnCapability,
  useCallStateHooks,
  useRequestPermission,
} from '@stream-io/video-react-sdk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Controls } from './controls';
import { Participants } from './participants';
import { PermissionRequestPanel } from './permission-request';

import { useUserContext } from '@/contexts/user';

export const Room = () => {
  const {
    useCallCustomData,
    useParticipants,
    useCallCreatedBy,
    useIsCallLive,
  } = useCallStateHooks();
  const custom = useCallCustomData();
  const participants = useParticipants();
  const createdBy = useCallCreatedBy();
  const { hasPermission, requestPermission } = useRequestPermission(
    OwnCapability.SEND_AUDIO
  );
  const { user } = useUserContext();
  const isLive = useIsCallLive();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLive && user?.username !== createdBy?.id) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  return (
    <div className='room'>
      <h2 className='title'>{custom?.title ?? 'TITLE'}</h2>
      <h3 className='description'>{custom?.description ?? 'DESCRIPTION'}</h3>
      <p className='participant-count'>{participants.length} participants</p>

      <Participants />

      {user?.username === createdBy?.id && <PermissionRequestPanel />}

      {hasPermission ? (
        <Controls />
      ) : (
        <button onClick={requestPermission}>&#9995;</button>
      )}
    </div>
  );
};
