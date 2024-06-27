import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

export const LiveButton = () => {
  const { useIsCallLive } = useCallStateHooks();
  const call = useCall();
  const isLive = useIsCallLive();

  return (
    <button
      style={{
        backgroundColor: 'rgb(35, 35, 35)',
        boxShadow: isLive ? '0 0 1px 2px green' : 'none',
      }}
      onClick={async () => {
        if (isLive) {
          await call?.stopLive();
        } else {
          await call?.goLive();
        }
      }}
    >
      {isLive ? 'Stop Live' : 'Go Live'}
    </button>
  );
};
