import { useCallStateHooks } from '@stream-io/video-react-sdk';

import { LiveButton } from './live-button';
import { MicButton } from './mic-button';

import { useUserContext } from '@/contexts/user';

export const Controls = () => {
  const { useCallCreatedBy } = useCallStateHooks();
  const createdBy = useCallCreatedBy();
  const { user } = useUserContext();

  return (
    <div className='controls-panel'>
      <MicButton />
      {user?.username === createdBy?.id && <LiveButton />}
    </div>
  );
};
