"use client";
import { useState } from 'react'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Configure the public client
const publicClient = createPublicClient({
	chain: mainnet,
	transport: http()
})

export default function TransactionPublisher() {
	const [signedTx, setSignedTx] = useState('')
	const [status, setStatus] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handlePublish = async () => {
		if (!signedTx) {
			setError('Please enter a signed transaction')
			return
		}

		setLoading(true)
		setError('')
		setStatus('Publishing transaction...')

		try {
			// Send the raw signed transaction
			const txHash = await publicClient.sendRawTransaction({
				serializedTransaction: signedTx as `0x${string}`
			})

			setStatus(`Transaction submitted with hash: ${txHash}`)

			// Wait for the transaction to be mined
			setStatus('Waiting for transaction to be mined...')
			const receipt = await publicClient.waitForTransactionReceipt({
				hash: txHash
			})

			setStatus(`Transaction mined in block ${receipt.blockNumber}`)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to publish transaction')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col space-y-4 w-full max-w-sm">
			<div className="flex space-x-2">
				<Input
					type="text"
					placeholder="Signed Transaction"
					value={signedTx}
					onChange={(e) => setSignedTx(e.target.value)}
					disabled={loading}
				/>
				<Button
					onClick={handlePublish}
					disabled={loading || !signedTx}
				>
					{loading ? 'Publishing...' : 'Publish'}
				</Button>
			</div>

			{status && (
				<Alert className="bg-blue-50">
					<AlertDescription>
						{status}
					</AlertDescription>
				</Alert>
			)}

			{error && (
				<Alert variant="destructive">
					<AlertDescription>
						{error}
					</AlertDescription>
				</Alert>
			)}
		</div>
	)
}
