"use client";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
export const config = getDefaultConfig({
	appName: 'Windfall Staking',
	projectId: "6880439c2c1363ca1004fc65acbf043f",
	chains: [mainnet],
	ssr: true,
})



