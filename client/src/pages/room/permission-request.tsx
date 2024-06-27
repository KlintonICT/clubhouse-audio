import { PermissionRequestEvent, useCall } from '@stream-io/video-react-sdk';
import { useCallback, useEffect, useState } from 'react';

export const PermissionRequestPanel = () => {
  const call = useCall();
  const [permissionRequests, setPermissionRequests] = useState<
    PermissionRequestEvent[]
  >([]);

  useEffect(() => {
    return call?.on('call.permission_request', (event) => {
      const request = event as PermissionRequestEvent;
      setPermissionRequests((prev) => [...prev, request]);
    });
  }, [call]);

  const handlePermissionRequest = useCallback(
    async (request: PermissionRequestEvent, accept: boolean) => {
      const { user, permissions } = request;

      try {
        if (accept) {
          await call?.grantPermissions(user.id, permissions);
        } else {
          await call?.revokePermissions(user.id, permissions);
        }
        setPermissionRequests((prev) => prev.filter((req) => req !== request));
      } catch (err) {
        alert('Error while approving/denying request');
      }
    },
    [call]
  );

  if (!permissionRequests.length) return;

  return (
    <div className='permission-request'>
      <h4>Permission Requests</h4>
      {permissionRequests.map((request) => (
        <div className='permission-request' key={request.user.id}>
          <span>
            {request.user.name} requested to {request.permissions.join(', ')}
          </span>{' '}
          <button
            onClick={() => handlePermissionRequest(request, true)}
            style={{ backgroundColor: 'green' }}
          >
            Approve
          </button>
          <button onClick={() => handlePermissionRequest(request, false)}>
            Deny
          </button>
        </div>
      ))}
    </div>
  );
};