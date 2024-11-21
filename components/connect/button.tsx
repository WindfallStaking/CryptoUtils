"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function RainbowConnect() {
	return (
		<ConnectButton accountStatus={"full"} chainStatus={"icon"} />

	);
}

