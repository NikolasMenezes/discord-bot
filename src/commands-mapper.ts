import { readdirSync } from 'fs';
import { join } from 'path';
import { CommandInterface } from './interfaces/command.interface';

export async function commandMapper() {
  const commands: CommandInterface[] = [];

  const foldersPath = join(__dirname, 'commands');
  const commandFolders = readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith('.ts'),
    );

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const { command } = await import(filePath);

      if ('name' in command && 'data' in command && 'execute' in command) {
        commands.push(command);
      } else {
        console.warn(
          `[WARNING] The command at ${filePath} is missing a required property.`,
        );
      }
    }
  }

  return commands;
}
