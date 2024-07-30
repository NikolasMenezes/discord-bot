import { CommandInterface } from "../../interfaces/command.interface";
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const command: CommandInterface = {
  name: "status",

  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Changes bot status"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const messages = await interaction.channel?.messages.fetch({ limit: 100 });

    console.log(messages);
    interaction.reply(`Cleaned up!`);
  },
};
