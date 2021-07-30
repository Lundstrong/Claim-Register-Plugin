export type claimFrame = Frame & {
	["UICorner"]: UICorner;
	["logoImage"]: ImageLabel;
	["unclaimedFrame"]: Frame & {
		["claimButton"]: TextButton & {
			["UICorner"]: UICorner;
			["claimButton"]: TextButton;
		};
	};
	["claimedFrame"]: Frame & {
		["openButton"]: TextButton & {
			["UICorner"]: UICorner;
			["openButton"]: TextButton;
		};
		["unClaimButton"]: TextButton & {
			["UICorner"]: UICorner;
			["unClaimButton"]: TextButton;
		};
		["claimedBy"]: TextLabel;
		["claimerName"]: TextLabel;
	};
}
