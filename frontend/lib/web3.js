import { ethers } from "ethers";
import scholarChainAbi from "../scholarchain.abi.json";

export const SEPOLIA_CHAIN_ID_DEC = 11155111;
export const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

export function getContractAddress() {
	return process.env.NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS || "";
}

export async function ensureMetaMask() {
	if (typeof window === "undefined" || !window.ethereum) {
		throw new Error("MetaMask not found");
	}
}

export async function connectWallet() {
	await ensureMetaMask();
	const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
	return accounts?.[0] || "";
}

export async function getChainId() {
	await ensureMetaMask();
	const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
	return Number.parseInt(chainIdHex, 16);
}

export async function switchToSepolia() {
	await ensureMetaMask();
	try {
		await window.ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }]
		});
	} catch (err) {
		// 4902 = unknown chain, add it
		if (err?.code === 4902) {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: SEPOLIA_CHAIN_ID_HEX,
						chainName: "Sepolia",
						nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
						rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL].filter(Boolean),
						blockExplorerUrls: ["https://sepolia.etherscan.io/"]
					}
				]
			});
		} else {
			throw err;
		}
	}
}

export async function getSigner() {
	await ensureMetaMask();
	const provider = new ethers.BrowserProvider(window.ethereum);
	return await provider.getSigner();
}

export async function getScholarChainContract(signer) {
	const addr = getContractAddress();
	if (!addr) throw new Error("Missing NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS");
	return new ethers.Contract(addr, scholarChainAbi.abi, signer);
}

