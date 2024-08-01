import { CommandInterface } from '../../interfaces/command.interface';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

const _options = [
  { name: `Don't disturb`, value: 'dnd' },
  { name: 'Online', value: 'online' },
  { name: 'Idle', value: 'idle' },
  { name: 'Invisible', value: 'invisible' },
];

const statusName = {
  dnd: `Don't disturb`,
  online: 'Online',
  idle: 'Idle',
  invisible: 'Invisible',
};

export const command: CommandInterface = {
  name: 'status',

  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Changes bot status')
    .addStringOption((option) =>
      option
        .setName('status')
        .setDescription('Defines the bot status')
        .setRequired(true)
        .addChoices(_options),
    ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    // can't find a correct type definition
    const status = await interaction.options._hoistedOptions[0].value;
    interaction.client.user.setPresence({
      status,
    });
    interaction.reply(
      'Bot status changed to ' + statusName[status as keyof typeof statusName],
    );
  },
};
