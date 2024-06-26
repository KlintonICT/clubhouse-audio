import { StreamClient } from '@stream-io/node-sdk';

import { config } from '@/config';

export const client = new StreamClient(config.apiKey, config.apiKeySecret);
