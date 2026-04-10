"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { api, setToken } from "../../lib/api";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await api.post("/auth/login", { email, password });
			setToken(res.data.token);
			window.location.href = "/dashboard";
		} catch (err) {
			alert(err?.response?.data?.error || err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen text-slate-100">
			<Navbar account="" onConnectWallet={() => {}} network="" />
			<main className="px-4 pb-16 pt-24">
				<div className="mx-auto max-w-lg">
					<p className="sc-kicker mb-2">Authentication</p>
					<h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-50">Sign in</h1>
					<p className="mb-8 text-sm text-slate-500">JWT session for API access. Use the role you registered with.</p>
					<Card className="p-8" hover={false}>
						<form onSubmit={onSubmit} className="space-y-6">
							<Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							<Input
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit" variant="primary" loading={loading} className="w-full">
								Login
							</Button>
						</form>
						<div className="mt-6 text-sm text-slate-500">
							No account?{" "}
							<Link className="font-mono text-cyan-400/90 underline-offset-4 hover:text-cyan-300 hover:underline" href="/register">
								Register
							</Link>
						</div>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}

