import { Players, ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services";
import { Remotes } from "ReplicatedStorage/remotes";
import { Register } from "ReplicatedStorage/structures";
import { claimFrame } from "./cashierClaimGui";

const ordersFolder = Workspace.WaitForChild("LundstrongOrders") as Folder;
const config = ordersFolder.WaitForChild("Configuration");
const claimableRegisters = ordersFolder.WaitForChild("Models").WaitForChild("Claimable") as Folder;
const UpdateRegisterEvent = Remotes.Client.Get("UpdateRegister");
const RegisterStatusEvent = Remotes.Client.Get("RegisterStatuses");
const openGuiEvent = Remotes.Client.Get("openCashierGui");

const children = claimableRegisters.GetChildren();

for (const register of children) {
	const gui = register.WaitForChild("mainPart").WaitForChild("mainGui") as SurfaceGui;

	(gui.WaitForChild("Frame") as Frame).Destroy(); // Remove placeholder GUI SERVERSIDE

	const registerId = (register.WaitForChild("registerId") as IntValue).Value;
	const currentStatus: Register = {
		id: registerId,
		isClaimed: false,
	};

	const clone = (script.WaitForChild("cashierClaimGui") as claimFrame).Clone();
	clone.Parent = gui;
	gui.Enabled = true;

	let debounce = false;

	clone.unclaimedFrame.claimButton.Activated.Connect(() => {
		debounce = true;
		currentStatus.isClaimed = true;
		currentStatus.claimedBy = Players.LocalPlayer;
		const registerCall = UpdateRegisterEvent.CallServer(currentStatus);
		if (registerCall === true) {
			debounce = false;
		} else {
			warn(`Unable to change register status. Register ID: ${registerId}`);
		}
	});

	clone.unclaimedFrame.claimButton.claimButton.Activated.Connect(() => {
		debounce = true;
		currentStatus.isClaimed = true;
		currentStatus.claimedBy = Players.LocalPlayer;
		const registerCall = UpdateRegisterEvent.CallServer(currentStatus);
		if (registerCall === true) {
			debounce = false;
		} else {
			warn(`Unable to change register status. Register ID: ${registerId}`);
		}
	});

	clone.claimedFrame.openButton.Activated.Connect(() => {
		openGuiEvent.SendToServer();
	});

	clone.claimedFrame.openButton.openButton.Activated.Connect(() => {
		openGuiEvent.SendToServer();
	});

	clone.claimedFrame.unClaimButton.Activated.Connect(() => {
		debounce = true;
		currentStatus.isClaimed = false;
		currentStatus.claimedBy = undefined;
		const registerCall = UpdateRegisterEvent.CallServer(currentStatus);
		if (registerCall === true) {
			debounce = false;
		} else {
			warn(`Unable to change register status. Register ID: ${registerId}`);
		}
	});

	clone.claimedFrame.unClaimButton.unClaimButton.Activated.Connect(() => {
		debounce = true;
		currentStatus.isClaimed = false;
		currentStatus.claimedBy = undefined;
		const registerCall = UpdateRegisterEvent.CallServer(currentStatus);
		if (registerCall === true) {
			debounce = false;
		} else {
			warn(`Unable to change register status. Register ID: ${registerId}`);
		}
	});

	RegisterStatusEvent.Connect((statuses) => {
		if (statuses[registerId - 1]) {
			if (statuses[registerId - 1].isClaimed === true) {
				const claimer = statuses[registerId - 1].claimedBy;
				if (claimer) {
					const frame = gui.WaitForChild("cashierClaimGui") as claimFrame;
					frame.unclaimedFrame.Visible = false;
					frame.claimedFrame.Visible = true;
					frame.claimedFrame.claimerName.Text = claimer.DisplayName;
				}
			} else {
				if (statuses[registerId - 1].isClaimed === false) {
					const frame = gui.WaitForChild("cashierClaimGui") as claimFrame;
					frame.unclaimedFrame.Visible = true;
					frame.claimedFrame.Visible = false;
				}
			}
		}
	});
}
