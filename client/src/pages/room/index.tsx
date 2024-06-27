import {
  OwnCapability,
  useCallStateHooks,
  useRequestPermission,
} from '@stream-io/video-react-sdk';

import { Controls } from './controls';
import { PermissionRequestPanel } from './permission-request';

import { useUserContext } from '@/contexts/user';

export const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } =
    useCallStateHooks();
  const custom = useCallCustomData();
  const participants = useParticipants();
  const createdBy = useCallCreatedBy();
  const { hasPermission, requestPermission } = useRequestPermission(
    OwnCapability.SEND_AUDIO
  );
  const { user } = useUserContext();

  return (
    <div className='room'>
      <h2 className='title'>{custom?.title ?? 'TITLE'}</h2>
      <h3 className='description'>{custom?.description ?? 'DESCRIPTION'}</h3>
      <p className='participant-count'>{participants.length} participants</p>

      {user?.username === createdBy?.id && <PermissionRequestPanel />}

      {hasPermission ? (
        <Controls />
      ) : (
        <button onClick={requestPermission}>&#9995;</button>
      )}
    </div>
  );
};
