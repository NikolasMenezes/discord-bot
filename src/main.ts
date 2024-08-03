import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { env } from './config/env';
import { commandMapper } from './commands-mapper';

const commands = commandMapper();

async function registerCommands() {
  const filteredCommands = (await commands).map((command) =>
    command.data.toJSON(),
  );

  try {
    const rest = new REST().setToken(env.BOT_TOKEN);

    console.log(
      `Started refreshing ${filteredCommands.length} application (/) commands.`,
    );

    const data = (await rest.put(
      Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
      { body: filteredCommands },
    )) as unknown[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
}
registerCommands();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  readyClient.user.setPresence({
    activities: [
      {
        name: `Under development`,
        type: ActivityType.Playing,
      },
    ],
  });
  console.log(`Ready! Logged in as ${readyClient.user.tag} 😎`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const receivedCommand = interaction.commandName;

  const [commandToExecute] = (await commands).filter(
    (command) => command.name === receivedCommand,
  );

  if (!commandToExecute) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    commandToExecute.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

client.login(env.BOT_TOKEN);
