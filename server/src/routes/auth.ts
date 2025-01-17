import { UserObjectRequest } from '@stream-io/node-sdk';
import { Router, Request, Response } from 'express';

import { client } from '@/stream-client';

const router = Router();

router.post('/create-user', async (req: Request, res: Response) => {
  const { username, name, image } = req.body;

  if (!username || !name || !image) {
    return res.status(400).json({ message: 'Required fields were empty' });
  }

  const newUser: UserObjectRequest = {
    id: username,
    role: 'user',
    name,
    image,
  };
  await client.upsertUsers({
    users: {
      [newUser.id]: newUser,
    },
  });

  const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day
  const token = client.createToken(username, expiry);

  return res.status(200).json({ token, username, name });
});

export default router;
