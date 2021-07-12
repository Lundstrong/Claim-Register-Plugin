type claimFrame = Frame & {
	["UICorner"]: UICorner;
	["logoImage"]: ImageLabel;
	["claimButton"]: TextButton & {
		["UICorner"]: UICorner;
		["claimButton"]: TextButton;
	};
	["claimerName"]: TextLabel;
	["claimedBy"]: TextLabel;
}
