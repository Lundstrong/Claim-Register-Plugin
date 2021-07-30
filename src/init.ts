import { ReplicatedStorage, Players, StarterGui, ServerScriptService } from "@rbxts/services";

export = function () {
	const repStorage = script.FindFirstChild("ReplicatedStorage");
	const guiObjects = script.FindFirstChild("StarterGui");
	const server = script.FindFirstChild("ServerScriptService");
	if (repStorage !== undefined) {
		repStorage.Parent = ReplicatedStorage;
		repStorage.Name = "Claim Register Plugin";
	} else {
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Shared)",
		);
	}
	if (guiObjects !== undefined) {
		for (const Player of Players.GetPlayers()) {
			for (const guiInstance of guiObjects.GetChildren()) {
				guiInstance.Clone().Parent = Player.WaitForChild("PlayerGui");
			}
		}
		for (const guiInstance of guiObjects.GetChildren()) {
			guiInstance.Clone().Parent = StarterGui;
		}
	} else {
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Client)",
		);
	}
	if (server !== undefined) {
		server.Parent = ServerScriptService;
		server.Name = "Claim Register Plugin";
	} else {
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Server)",
		);
	}
};
