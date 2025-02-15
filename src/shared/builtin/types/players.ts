import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { CommanderType } from ".";
import { BaseRegistry } from "../../core/registry";
import { TransformationResult } from "../../types";
import { TransformResult, TypeBuilder } from "../../util/type";

const getPlayer = (text: string): TransformationResult<Player> => {
	for (const player of Players.GetPlayers()) {
		if (player.Name.lower() === text.lower()) {
			return TransformResult.ok(player);
		}
	}

	return TransformResult.err("Player not found");
};

const isPlayer = t.instanceOf("Player");
const playerType = TypeBuilder.create<Player>(CommanderType.Player)
	.validate(isPlayer)
	.transform(getPlayer)
	.suggestions(() => Players.GetPlayers().map((player) => player.Name))
	.build();

const playersType = TypeBuilder.create(CommanderType.Players)
	.validate(t.array(isPlayer))
	.transform((text) => {
		const textLower = text.lower();
		if (textLower === "*") return TransformResult.ok(Players.GetPlayers());

		return getPlayer(text).map((player) => [player]);
	})
	.suggestions(() => {
		const playerNames = Players.GetPlayers().map((player) => player.Name);
		playerNames.insert(0, "*");
		return playerNames;
	})
	.build();

export = (registry: BaseRegistry) => {
	registry.registerTypes(playerType, playersType);
};
