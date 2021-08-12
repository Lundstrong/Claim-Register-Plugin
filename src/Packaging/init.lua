local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")
local ServerScriptService = game:GetService("ServerScriptService")

return function ()
	local repStorage = script:FindFirstChild("ReplicatedStorage");
	local guiObjects = script:FindFirstChild("StarterGui");
	local server = script:FindFirstChild("ServerScriptService");

	if (repStorage) then
		repStorage.Parent = ReplicatedStorage
		repStorage.Name = "Claim Register Plugin"
	else
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Shared)"
		);
	end

	if (guiObjects) then
		for _, Player in ipairs(Players:GetPlayers()) do
			for _, guiInstance in ipairs(guiObjects:GetChildren()) do
				guiInstance:Clone().Parent = Player:WaitForChild("PlayerGui")
			end
		end
		for _, guiInstance in ipairs(guiObjects:GetChildren()) do
			guiInstance:Clone().Parent = StarterGui
		end
	else
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Client)"
		);
	end

	if (server) then
		server.Parent = ServerScriptService
		server.Name = "Claim Register Plugin"
	else
		error(
			"[Claim Register Plugin] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Server)"
		);
	end
end
