import { $warn } from "@lundstrong/rbxts-transform-debug";
import { ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Remotes } from "ReplicatedStorage/remotes";
import { Register } from "ReplicatedStorage/structures";
import { OrdersAPI } from "@rbxts/lundstrong";

const UpdateRegisterEvent = Remotes.Server.Create("UpdateRegister");
const RegisterStatusEvent = Remotes.Server.Create("RegisterStatuses");
const OpenGuiEvent = Remotes.Server.Create("openCashierGui");
const isValidRegister = t.interface({
	id: t.number,
	isClaimed: t.boolean,
});

// make sure API events are loaded
ServerScriptService.WaitForChild("LundstrongOrders").WaitForChild("apiEvents");
const API = require(ReplicatedStorage.WaitForChild("LundstrongOrders").WaitForChild(
	"api",
) as ModuleScript) as OrdersAPI;

const ordersFolder = Workspace.WaitForChild("LundstrongOrders") as Folder;
const config = ordersFolder.WaitForChild("Configuration");
const claimableRegisters = ordersFolder.WaitForChild("Models").WaitForChild("Claimable") as Folder;
const RegisterStatuses: Register[] = [];
const playersWithRegistersClaimed: boolean[] = [];
const children = claimableRegisters.GetChildren();

for (let id = 0; id < children.size(); id++) {
	// Using a "legacy" approch here instead of a "for of" to allow for ID's to be generated.
	const idValue = new Instance("IntValue");
	idValue.Parent = children[id];
	idValue.Name = "registerId";
	// TS arrays are 0-indexed :/
	idValue.Value = id + 1;

	RegisterStatuses.push({ id: id + 1, isClaimed: false });
}

UpdateRegisterEvent.SetCallback((player, newStatus) => {
	if (isValidRegister(newStatus)) {
		if (newStatus.isClaimed === true) {
			if (playersWithRegistersClaimed[player.UserId] === true) {
				$warn(
					`${
						player.DisplayName !== player.Name
							? `${player.DisplayName} (@${player.Name})`
							: player.DisplayName
					} already has a register claimed`,
				);
				return false;
			} else {
				playersWithRegistersClaimed[player.UserId] = true;
				newStatus.claimedBy = player;
				RegisterStatuses[newStatus.id - 1] = newStatus;
				RegisterStatusEvent.SendToAllPlayers(RegisterStatuses);
				return true;
			}
		} else {
			playersWithRegistersClaimed[player.UserId] = false;
			RegisterStatuses[newStatus.id - 1] = newStatus;
			RegisterStatusEvent.SendToAllPlayers(RegisterStatuses);
			return true;
		}
	} else {
		$warn(
			`INVALID REGISTER REQUEST SENT FROM ${
				player.DisplayName !== player.Name ? `${player.DisplayName} (@${player.Name})` : player.DisplayName
			}`,
		);
		return false;
	}
});

OpenGuiEvent.Connect((player) => {
	API.EnableGui(player, "cashierGui");
});
