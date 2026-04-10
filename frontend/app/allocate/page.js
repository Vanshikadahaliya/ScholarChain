"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function AllocatePage() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [studentId, setStudentId] = useState("");
	const [amountEth, setAmountEth] = useState("0.01");
	const [payoutWallet, setPayoutWallet] = useState("");
	const [txHash, setTxHash] = useState("");

	const scholarshipId = useMemo(() => `SCH-${Date.now()}`, []);

	const load = async () => {
		try {
			setLoading(true);
			const res = await api.get("/students");
			setStudents(res.data.students || []);
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Failed to load students");
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

	const allocate = async (e) => {
		e.preventDefault();
		try {
			setSubmitting(true);
			setTxHash("");
			await switchToSepolia();
			const signer = await getSigner();
			const signerAddr = await signer.getAddress();
			const contract = await getScholarChainContract(signer);
			const amountWei = ethers.parseEther(String(amountEth || "0"));
			const payout = payoutWallet || signerAddr;

			const tx = await contract.allocateScholarship(studentId, amountWei, payout);
			const receipt = await tx.wait();
			setTxHash(receipt.hash);

			// Record in DB
			await api.post("/allocate/record", {
				scholarshipId,
				studentId,
				amountWei: amountWei.toString(),
				transactionHash: receipt.hash
			});

			alert("Allocation logged on-chain and stored in DB.");
		} catch (err) {
			alert(err?.reason || err?.response?.data?.error || err.message || "Allocation failed");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="relative min-h-screen text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />
			<main className="space-y-8 px-4 pb-16 pt-24">
				<div className="mx-auto max-w-4xl space-y-8">
					<div>
						<p className="sc-kicker mb-1">Admin · on-chain</p>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-50">Allocate scholarship</h1>
						<p className="mt-1 text-sm text-slate-500">Requires verified student and MetaMask as contract admin.</p>
					</div>

					<Card className="p-8" hover={false}>
						<form onSubmit={allocate} className="space-y-6">
							<div className="space-y-2">
								<label className="block text-xs font-medium uppercase tracking-wider text-slate-400">Verified student</label>
								<select
									className="w-full rounded-lg border border-slate-600/80 bg-slate-950/50 px-4 py-3 text-slate-100 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
									value={studentId}
									onChange={(e) => setStudentId(e.target.value)}
									required
								>
									<option className="text-black" value="">Select student</option>
									{students
										.filter((s) => s.status === "verified")
										.map((s) => (
											<option className="text-black" key={s.studentId} value={s.studentId}>
												{s.studentId} — {s.name}
											</option>
										))}
								</select>
							</div>
							<Input
								label="Amount (ETH)"
								type="number"
								step="0.001"
								min="0"
								value={amountEth}
								onChange={(e) => setAmountEth(e.target.value)}
							/>
							<Input
								label="Payout wallet (NGO-controlled wallet, optional)"
								value={payoutWallet}
								onChange={(e) => setPayoutWallet(e.target.value)}
								placeholder="0x..."
							/>
							<Button type="submit" variant="primary" loading={submitting} disabled={loading || !studentId} className="w-full">
								Allocate (MetaMask)
							</Button>
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

