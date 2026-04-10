import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
	const [deployer] = await ethers.getSigners();
	const ScholarChain = await ethers.getContractFactory("ScholarChain");
	const scholarChain = await ScholarChain.deploy(deployer.address);
	await scholarChain.waitForDeployment();
	const address = await scholarChain.getAddress();
	console.log("ScholarChain deployed to:", address);
	console.log("NGO Admin:", deployer.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});


