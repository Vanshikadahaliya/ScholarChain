"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { api, getToken } from "../../lib/api";
import {
	connectWallet,
	getChainId,
	switchToSepolia,
	getSigner,
	getScholarChainContract
} from "../../lib/web3";

export default function DonatePage() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [amountEth, setAmountEth] = useState("0.01");
	const [loading, setLoading] = useState(false);
	const [txHash, setTxHash] = useState("");

	useEffect(() => {
		(async () => {
			try {
				if (!window.ethereum) return;
				const chainId = await getChainId();
				setNetwork(String(chainId));
				const accounts = await window.ethereum.request({ method: "eth_accounts" });
				if (accounts?.[0]) setAccount(accounts[0]);
			} catch {
				// ignore
			}
		})();
	}, []);

	const onConnect = async () => {
		try {
			await switchToSepolia();
			const acc = await connectWallet();
			setAccount(acc);
			const chainId = await getChainId();
			setNetwork(String(chainId));
		} catch (e) {
			alert(e.message || "Failed to connect");
		}
	};

	const donate = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setTxHash("");
			await switchToSepolia();
			const signer = await getSigner();
			const contract = await getScholarChainContract(signer);
			const valueWei = ethers.parseEther(String(amountEth || "0"));
			const tx = await contract.donate({ value: valueWei });
			const receipt = await tx.wait();
			setTxHash(receipt.hash);

			// Optional: record in MongoDB (requires login token)
			if (getToken()) {
				await api.post("/donate", {
					donorAddress: account || (await signer.getAddress()),
					amountWei: valueWei.toString(),
					transactionHash: receipt.hash
				});
			}

			alert("Donation recorded on-chain.");
		} catch (err) {
			alert(err?.reason || err?.message || "Donation failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />
			<main className="space-y-8 px-4 pb-16 pt-24">
				<div className="mx-auto max-w-3xl space-y-8">
					<div>
						<p className="sc-kicker mb-1">Treasury inflow</p>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-50">Donate</h1>
						<p className="mt-1 text-sm text-slate-500">Sign a Sepolia transaction to the ScholarChain contract.</p>
					</div>
					<Card className="p-8" hover={false}>
						<form onSubmit={donate} className="space-y-6">
							<Input
								label="Amount (ETH)"
								type="number"
								step="0.001"
								min="0"
								value={amountEth}
								onChange={(e) => setAmountEth(e.target.value)}
							/>
							<Button type="submit" variant="primary" loading={loading} className="w-full">
								Send donation (MetaMask)
							</Button>
							{!getToken() && (
								<div className="text-sm text-slate-500">
									Log in to persist the transaction hash in MongoDB (optional).
								</div>
							)}
							{txHash && (
								<div className="break-all font-mono text-sm text-cyan-200/90">
									tx {txHash}
								</div>
							)}
						</form>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}

