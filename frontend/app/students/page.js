"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { api, getToken } from "../../lib/api";
import { connectWallet, getChainId, switchToSepolia } from "../../lib/web3";

export default function StudentsPage() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [studentId, setStudentId] = useState("");
	const [name, setName] = useState("");

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

	const addStudent = async (e) => {
		e.preventDefault();
		try {
			await api.post("/students", { studentId, name });
			setStudentId("");
			setName("");
			await load();
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Failed to add student");
		}
	};

	const setStatus = async (id, status) => {
		try {
			await api.patch(`/students/${id}/status`, { status });
			await load();
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Failed to update status");
		}
	};

	return (
		<div className="relative min-h-screen text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />
			<main className="space-y-8 px-4 pb-16 pt-24">
				<div className="mx-auto max-w-7xl space-y-8">
					<div>
						<p className="sc-kicker mb-1">Off-chain registry</p>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-50">Students</h1>
						<p className="mt-1 text-sm text-slate-500">MongoDB records; verify before allocating on-chain.</p>
					</div>

					<Card className="p-8" hover={false}>
						<h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">Add record</h2>
						<form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
							<Input label="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
							<Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
							<Button type="submit" variant="primary">Add</Button>
						</form>
					</Card>

					<Card className="p-8" hover={false}>
						<h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">Directory</h2>
						{loading ? (
							<div className="font-mono text-sm text-slate-500">Loading…</div>
						) : students.length === 0 ? (
							<div className="text-slate-500">No students</div>
						) : (
							<div className="space-y-3">
								{students.map((s) => (
									<div
										key={s.studentId}
										className="flex flex-col gap-3 rounded-xl border border-cyan-500/10 bg-slate-950/40 p-4 md:flex-row md:items-center md:justify-between"
									>
										<div>
											<div className="font-semibold text-slate-100">{s.name}</div>
											<div className="font-mono text-sm text-slate-500">{s.studentId}</div>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-mono text-xs uppercase tracking-wider text-slate-500">{s.status}</span>
											<Button variant="outline" size="sm" onClick={() => setStatus(s.studentId, "verified")}>
												Verify
											</Button>
											<Button variant="outline" size="sm" onClick={() => setStatus(s.studentId, "rejected")}>
												Reject
											</Button>
										</div>
									</div>
								))}
							</div>
						)}
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}

