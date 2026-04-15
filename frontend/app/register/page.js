"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { api } from "../../lib/api";

export default function RegisterPage() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("donor");

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await api.post("/auth/register", { name, email, password, role });
			alert("Registered. Please login.");
			window.location.href = "/login";
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen bg-white text-slate-900 dark:bg-[#05080c] dark:text-slate-100">
			<Navbar account="" onConnectWallet={() => {}} network="" />
			<main className="px-4 pb-16 pt-24">
				<div className="mx-auto max-w-lg">
					<p className="sc-kicker mb-2">Onboarding</p>
					<h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Create account</h1>
					<p className="mb-8 text-sm text-slate-600 dark:text-slate-400">Pick a role: donor, student, staff, or admin. Password is hashed server-side.</p>
					<Card className="p-8" hover={false}>
						<form onSubmit={onSubmit} className="space-y-6">
							<Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
							<Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							<Input
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="space-y-2">
								<label className="block text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">Role</label>
								<select
									className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 backdrop-blur-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 dark:border-slate-600/80 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-cyan-500/50 dark:focus:ring-cyan-500/30"
									value={role}
									onChange={(e) => setRole(e.target.value)}
								>
									<option className="text-black" value="donor">Donor</option>
									<option className="text-black" value="student">Student</option>
									<option className="text-black" value="staff">NGO Staff</option>
									<option className="text-black" value="admin">NGO Admin</option>
								</select>
							</div>
							<Button type="submit" variant="primary" loading={loading} className="w-full">
								Create account
							</Button>
						</form>
						<div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
							Already have an account?{" "}
							<Link className="font-mono text-cyan-700 underline-offset-4 hover:text-cyan-600 hover:underline dark:text-cyan-400/90 dark:hover:text-cyan-300" href="/login">
								Login
							</Link>
						</div>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}

