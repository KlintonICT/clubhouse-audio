import { Router, Request, Response } from 'express';

const router = Router();

router.post('/create-user', async (req: Request, res: Response) => {
  const { username, name, image } = req.body;

  if (!username || !name || !image) {
    return res.status(400).json({ message: 'Required fields were empty' });
  }
});

export default router;
