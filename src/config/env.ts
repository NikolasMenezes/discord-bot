import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string(),
  CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
  MOVIE_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
