import { CommandInterface } from "../../interfaces/command.interface";
import {
  BaseGuildTextChannel,
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const command: CommandInterface = {
  name: "clear",

  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear the last 100 messages from the current chat!"),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const channel = interaction.channel;

    if (channel instanceof BaseGuildTextChannel) {
      const messages = await channel.messages.fetch({ limit: 100 });
      channel.bulkDelete(messages, true);
    }

    interaction.reply("Deleting ...");

    interaction.deleteReply();
  },
};
