"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api, setToken, getToken } from "../../lib/api";
import { connectWallet, getChainId, switchToSepolia } from "../../lib/web3";

export default function DashboardPage() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (!getToken()) {
				window.location.href = "/login";
				return;
			}
			try {
				setLoading(true);
				const res = await api.get("/dashboard");
				setData(res.data);
			} catch (err) {
				alert(err?.response?.data?.error || err.message || "Failed to load dashboard");
			} finally {
				setLoading(false);
			}
		})();
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

	const logout = () => {
		setToken("");
		window.location.href = "/login";
	};

	const onchain = data?.onchain;
	const counts = data?.counts;

	return (
		<div className="relative min-h-screen text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />
			<main className="space-y-8 px-4 pb-16 pt-24">
				<div className="mx-auto max-w-7xl space-y-8">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="sc-kicker mb-1">Operations</p>
							<h1 className="text-3xl font-semibold tracking-tight text-slate-50">Dashboard</h1>
							<p className="mt-1 text-sm text-slate-500">On-chain totals and database counts.</p>
						</div>
						<Button variant="outline" onClick={logout}>
							Log out
						</Button>
					</div>

					{loading ? (
						<div className="font-mono text-sm text-slate-500">Loading…</div>
					) : !data ? (
						<div className="text-slate-500">No data</div>
					) : (
						<>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Students</div>
									<div className="mt-2 text-3xl font-semibold tabular-nums text-slate-50">{counts.studentsCount}</div>
								</Card>
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Donations (DB)</div>
									<div className="mt-2 text-3xl font-semibold tabular-nums text-slate-50">{counts.donationsCount}</div>
								</Card>
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Allocations (DB)</div>
									<div className="mt-2 text-3xl font-semibold tabular-nums text-slate-50">{counts.allocationsCount}</div>
								</Card>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Σ Donations (chain)</div>
									<div className="mt-2 text-xl font-semibold tabular-nums text-cyan-200">
										{ethers.formatEther(onchain.totalDonationsWei)} ETH
									</div>
								</Card>
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Σ Allocated (chain)</div>
									<div className="mt-2 text-xl font-semibold tabular-nums text-cyan-200">
										{ethers.formatEther(onchain.totalAllocatedWei)} ETH
									</div>
								</Card>
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Contract balance</div>
									<div className="mt-2 text-xl font-semibold tabular-nums text-cyan-200">
										{ethers.formatEther(onchain.contractBalanceWei)} ETH
									</div>
								</Card>
								<Card className="p-6" hover={false}>
									<div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">NGO admin</div>
									<div className="mt-2 break-all font-mono text-xs text-slate-300">{onchain.ngoAdmin}</div>
								</Card>
							</div>
						</>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

