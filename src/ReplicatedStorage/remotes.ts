import { Definitions } from "@rbxts/net";
import { Register } from "./structures";

const Remotes = Definitions.Create({
	UpdateRegister: Definitions.ServerFunction<(newStatus: Register) => boolean>(),
	RegisterStatuses: Definitions.ServerToClientEvent<[statuses: Register[]]>(),
	openCashierGui: Definitions.ClientToServerEvent<[]>(),
});

export { Remotes };
