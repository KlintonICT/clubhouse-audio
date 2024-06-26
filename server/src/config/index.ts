import { config as dotEnvConfig } from 'dotenv-safe';

dotEnvConfig();

export const config = {
  PORT: process.env.PORT ?? 3001,
  apiKey: process.env.STREAM_API_KEY ?? '',
  apiKeySecret: process.env.STREAM_API_KEY_SECRET ?? '',
};
