const { ethers } = require("ethers");

const SCHOLAR_CHAIN_ABI = [
	"function donate() payable",
	"function allocateScholarship(string studentId,uint256 amount,address payoutWallet)",
	"function ngoAdmin() view returns (address)",
	"function totalDonations() view returns (uint256)",
	"function totalAllocated() view returns (uint256)",
	"function getAllocationsCount() view returns (uint256)",
	"function getContractBalance() view returns (uint256)",
	"function getAllAllocations() view returns (tuple(string studentId,uint256 amount,uint256 timestamp,address approvedBy)[])",
	"event DonationReceived(address indexed donor,uint256 amount,uint256 timestamp)",
	"event ScholarshipAllocated(string indexed studentId,uint256 amount,uint256 timestamp,address indexed approvedBy)"
];

function getProvider() {
	const rpc = process.env.SEPOLIA_RPC_URL;
	if (!rpc) throw new Error("SEPOLIA_RPC_URL is required");
	return new ethers.JsonRpcProvider(rpc);
}

function getContract(readonly = true) {
	const address = process.env.SCHOLARCHAIN_CONTRACT_ADDRESS;
	if (!address) throw new Error("SCHOLARCHAIN_CONTRACT_ADDRESS is required");

	const provider = getProvider();
	if (readonly) {
		return new ethers.Contract(address, SCHOLAR_CHAIN_ABI, provider);
	}

	const pk = process.env.NGO_ADMIN_PRIVATE_KEY;
	if (!pk) throw new Error("NGO_ADMIN_PRIVATE_KEY not configured");
	const wallet = new ethers.Wallet(pk, provider);
	return new ethers.Contract(address, SCHOLAR_CHAIN_ABI, wallet);
}

module.exports = { SCHOLAR_CHAIN_ABI, getContract };

