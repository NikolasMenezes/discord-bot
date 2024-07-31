import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export interface CommandInterface {
  name: string;
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<CacheType>,
  ) => Promise<void>;
}
