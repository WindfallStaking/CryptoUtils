'use client';
import { useState, useEffect, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	return (
		<WagmiProvider config={config} >
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children} </RainbowKitProvider>
				< ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</WagmiProvider>
	);
}
