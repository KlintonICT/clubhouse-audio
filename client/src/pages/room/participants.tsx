import {
  useCallStateHooks,
  ParticipantsAudio,
} from '@stream-io/video-react-sdk';

import { Participant } from './participant';

export const Participants = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <div className='participants-panel'>
      <div className='participants'>
        <ParticipantsAudio participants={participants} />
        {participants.map((p) => (
          <Participant key={p.sessionId} participant={p} />
        ))}
      </div>
    </div>
  );
};
