import cors from 'cors';
import express from 'express';

import { config } from '@/config';
import authRoute from '@/routes/auth';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
