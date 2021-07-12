import { Definitions } from "@rbxts/net";
import { Register } from "./structures";

const Remotes = Definitions.Create({
	UpdateRegister: Definitions.ClientToServerEvent<[id: number]>(),
	RegisterStatuses: Definitions.ServerToClientEvent<[statuses: Register[]]>(),
});

export { Remotes };
