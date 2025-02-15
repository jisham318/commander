import {
	Command,
	CommandInteraction,
	Commander,
	CommanderType,
} from "@rbxts/commander";

@Commander()
class KillCommand {
	@Command({
		name: "kill",
		description: "Kills a player",
		arguments: [
			{
				name: "player",
				description: "Player to kill",
				type: CommanderType.Player,
			},
		],
	})
	kill(interaction: CommandInteraction, player: Player) {
		const humanoid = player.Character?.FindFirstChildOfClass("Humanoid");
		if (humanoid === undefined) {
			interaction.error(`${player.Name} does not have a Humanoid`);
			return;
		}

		humanoid.Health = 0;
		interaction.reply(`Successfully killed ${player.Name}`);
	}
}
