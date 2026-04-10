"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { connectWallet, getChainId, switchToSepolia } from "../lib/web3";

const pillars = [
	{
		title: "Immutable ledger",
		body: "Donations and scholarship allocations emit on-chain events you can verify on a block explorer.",
		tag: "01",
	},
	{
		title: "Role separation",
		body: "Donors, NGO staff, admins, and students map to JWT roles—API access matches real workflows.",
		tag: "02",
	},
	{
		title: "Off-chain privacy",
		body: "Student PII and documents live in MongoDB; chain only stores ids, amounts, and hashes.",
		tag: "03",
	},
];

export default function Home() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");

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
		<div className="relative min-h-screen">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />

			<main className="pt-16">
				<section className="relative px-4 pb-16 pt-12 md:pb-24 md:pt-16">
					<div className="mx-auto max-w-6xl">
						<div className="sc-panel relative overflow-hidden rounded-2xl border border-cyan-500/20 p-8 shadow-glow md:p-12">
							<div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
							<div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl" />

							<p className="sc-kicker mb-4">ScholarChain · NGO scholarship transparency</p>
							<h1 className="mb-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl md:leading-[1.1]">
								<span className="gradient-text">Verify every rupee.</span>
								<span className="text-slate-300"> Fund flows and allocations on-chain.</span>
							</h1>
							<p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
								A technical control plane for donors and NGOs: MetaMask-signed transfers, MongoDB-backed
								identity, and explorer-ready transaction hashes—without mixing student data into the ledger.
							</p>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<Link href="/donate" className="inline-flex">
									<button type="button" className="btn-primary min-w-[160px]">
										Open donate flow
									</button>
								</Link>
								<Link href="/dashboard" className="inline-flex">
									<button type="button" className="btn-secondary min-w-[200px]">
										Operations dashboard
									</button>
								</Link>
								<Link href="/register" className="inline-flex sm:ml-1">
									<button
										type="button"
										className="rounded-lg border border-transparent px-4 py-3 font-mono text-xs uppercase tracking-wider text-cyan-400/90 underline-offset-4 hover:text-cyan-300 hover:underline"
									>
										Create account
									</button>
								</Link>
							</div>

							<dl className="mt-10 grid gap-4 border-t border-cyan-500/15 pt-8 font-mono text-[11px] text-slate-500 sm:grid-cols-3">
								<div>
									<dt className="text-slate-600">Contract</dt>
									<dd className="mt-1 truncate text-cyan-200/90" title={process.env.NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS}>
										{process.env.NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS || "Not configured"}
									</dd>
								</div>
								<div>
									<dt className="text-slate-600">API</dt>
									<dd className="mt-1 text-cyan-200/90">
										{process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}
									</dd>
								</div>
								<div>
									<dt className="text-slate-600">Wallet</dt>
									<dd className="mt-1 text-emerald-300/90">
										{account ? `${account.slice(0, 6)}…${account.slice(-4)}` : "Not connected"}
									</dd>
								</div>
							</dl>
						</div>

						<div className="mt-10 grid gap-4 md:grid-cols-3">
							{pillars.map((p) => (
								<div
									key={p.tag}
									className="sc-panel rounded-xl border border-cyan-500/10 p-5 transition-colors hover:border-cyan-500/25"
								>
									<div className="mb-3 flex items-center justify-between">
										<span className="font-mono text-[10px] font-semibold text-cyan-500/80">{p.tag}</span>
										<span className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent pl-3" />
									</div>
									<h2 className="mb-2 text-sm font-semibold text-slate-100">{p.title}</h2>
									<p className="text-sm leading-relaxed text-slate-500">{p.body}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
