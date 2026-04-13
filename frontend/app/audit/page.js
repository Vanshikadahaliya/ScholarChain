"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api, getToken } from "../../lib/api";
import { connectWallet, getChainId, switchToSepolia } from "../../lib/web3";

export default function AuditPage() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [loading, setLoading] = useState(true);
	const [donations, setDonations] = useState([]);
	const [allocations, setAllocations] = useState([]);
	const [onchainAllocations, setOnchainAllocations] = useState([]);

	const load = async () => {
		try {
			setLoading(true);
			const [dRes, aRes, ocRes] = await Promise.all([
				api.get("/donate/transactions"),
				api.get("/allocate/transactions"),
				api.get("/allocate/audit/onchain")
			]);
			setDonations(dRes.data.donations || []);
			setAllocations(aRes.data.allocations || []);
			setOnchainAllocations(ocRes.data.allocations || []);
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Failed to load audit data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!getToken()) {
			window.location.href = "/login";
			return;
		}
		load();
	}, []);

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

	return (
		<div className="relative min-h-screen bg-white text-slate-900 dark:bg-[#05080c] dark:text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />
			<main className="space-y-8 px-4 pb-16 pt-24">
				<div className="mx-auto max-w-7xl space-y-8">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="sc-kicker mb-1 text-cyan-700 dark:text-cyan-300">Compliance</p>
							<h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Audit trail</h1>
							<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">MongoDB tx index plus contract allocation view.</p>
						</div>
						<Button variant="outline" onClick={load}>Refresh</Button>
					</div>

					{loading ? (
						<div className="font-mono text-sm text-slate-500">Loading…</div>
					) : (
						<>
<Card className="p-8 bg-white text-slate-900 shadow-sm border border-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800" hover={false}>
							<h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">Donations (MongoDB)</h2>
							<div className="space-y-2">
								{donations.map((d) => (
									<div key={d.transactionHash} className="rounded-xl border border-cyan-500/10 bg-slate-50 text-slate-900 dark:bg-slate-950/40 dark:text-slate-200 p-3">
										<div className="text-sm text-slate-700 dark:text-slate-400">From <span className="font-mono text-slate-900 dark:text-slate-300">{d.donorAddress}</span></div>
										<div className="text-sm text-slate-800 dark:text-slate-300">Amount: {ethers.formatEther(d.amountWei)} ETH</div>
										<div className="break-all text-sm text-cyan-700 dark:text-cyan-200/80">tx <span className="font-mono">{d.transactionHash}</span></div>
									</div>
								))}
								{donations.length === 0 && <div className="text-slate-600 dark:text-slate-400">No donations recorded</div>}
								</div>
							</Card>

<Card className="p-8 bg-white text-slate-900 shadow-sm border border-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800" hover={false}>
							<h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">Allocations (MongoDB)</h2>
							<div className="space-y-2">
								{allocations.map((a) => (
									<div key={a.transactionHash} className="rounded-xl border border-cyan-500/10 bg-slate-50 text-slate-900 dark:bg-slate-950/40 dark:text-slate-200 p-3">
										<div className="text-sm text-slate-700 dark:text-slate-300">Student <span className="font-mono text-slate-900 dark:text-slate-300">{a.studentId}</span></div>
										<div className="text-sm text-slate-800 dark:text-slate-300">Amount: {ethers.formatEther(a.amountWei)} ETH</div>
										<div className="break-all text-sm text-cyan-700 dark:text-cyan-200/80">tx <span className="font-mono">{a.transactionHash}</span></div>
									</div>
								))}
								{allocations.length === 0 && <div className="text-slate-600 dark:text-slate-400">No allocations recorded</div>}
						</div>
					</Card>

							<Card className="p-8 bg-white text-slate-900 shadow-sm border border-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800" hover={false}>
								<h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">Allocations (on-chain)</h2>
								<div className="space-y-2">
									{onchainAllocations.map((a, idx) => (
										<div key={`${a.studentId}-${a.timestamp}-${idx}`} className="rounded-xl border border-cyan-500/10 bg-slate-50 text-slate-900 dark:bg-slate-950/40 dark:text-slate-200 p-3">
											<div className="text-sm text-slate-700 dark:text-slate-300">Student <span className="font-mono text-slate-900 dark:text-slate-300">{a.studentId}</span></div>
										<div className="text-sm text-slate-800 dark:text-slate-300">Amount: {ethers.formatEther(a.amountWei)} ETH</div>
											<div className="text-sm text-slate-600 dark:text-slate-400">
												Approved by <span className="font-mono text-slate-900 dark:text-slate-300">{a.approvedBy}</span>
											</div>
											<div className="font-mono text-xs text-slate-500 dark:text-slate-400">
												{new Date(a.timestamp * 1000).toLocaleString()}
											</div>
										</div>
									))}
									{onchainAllocations.length === 0 && <div className="text-slate-600 dark:text-slate-400">No on-chain allocations</div>}
								</div>
							</Card>
						</>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

