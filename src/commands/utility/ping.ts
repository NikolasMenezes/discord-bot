import { CommandInterface } from '../../interfaces/command.interface';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export const command: CommandInterface = {
  name: 'ping',

  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sends bot current ping!'),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply(
      `🏓 Pong! Bot's ping is ${interaction.client.ws.ping} ms.`,
    );
  },
};
