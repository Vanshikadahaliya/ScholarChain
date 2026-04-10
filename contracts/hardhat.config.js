import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const {
	SEPOLIA_RPC_URL,
	POLYGON_RPC_URL,
	PRIVATE_KEY,
	ETHERSCAN_API_KEY,
	POLYGONSCAN_API_KEY
} = process.env;

/** @type {import("hardhat/config").HardhatUserConfig} */
const config = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: { enabled: true, runs: 200 }
		}
	},
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL || "",
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
			chainId: 11155111
		},
		amoy: {
			url: POLYGON_RPC_URL || "",
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
			chainId: 80002
		}
	},
	etherscan: {
		apiKey: {
			sepolia: ETHERSCAN_API_KEY || "",
			polygonAmoy: POLYGONSCAN_API_KEY || ""
		},
		customChains: [
			{
				network: "polygonAmoy",
				chainId: 80002,
				urls: {
					apiURL: "https://api-amoy.polygonscan.com/api",
					browserURL: "https://amoy.polygonscan.com/"
				}
			}
		]
	}
};

export default config;


