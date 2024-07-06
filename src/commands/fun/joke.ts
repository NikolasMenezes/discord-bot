import { CommandInterface } from "@/interfaces/command.interface";
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const command: CommandInterface = {
  name: "joke",

  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription('Sends a random joke!'),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        "Accept": "application/json"
      }
    })
    const { joke } = await response.json()

    await interaction.reply(joke);
  }
}