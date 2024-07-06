import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string(),
  CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
});

export const env = envSchema.parse(process.env);