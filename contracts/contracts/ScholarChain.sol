// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ScholarChain - NGO scholarship fund transparency logger
/// @notice Funds are held by this contract; allocations are logged on-chain for auditability.
contract ScholarChain {
	address public ngoAdmin;
	uint256 public totalDonations;
	uint256 public totalAllocated;

	struct Allocation {
		string studentId;
		uint256 amount;
		uint256 timestamp;
		address approvedBy;
	}

	Allocation[] private allocations;

	event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);
	event ScholarshipAllocated(string indexed studentId, uint256 amount, uint256 timestamp, address indexed approvedBy);
	event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

	modifier onlyAdmin() {
		require(msg.sender == ngoAdmin, "Only NGO admin");
		_;
	}

	constructor(address initialAdmin) {
		require(initialAdmin != address(0), "Admin=0");
		ngoAdmin = initialAdmin;
	}

	receive() external payable {
		donate();
	}

	function donate() public payable {
		require(msg.value > 0, "No value");
		totalDonations += msg.value;
		emit DonationReceived(msg.sender, msg.value, block.timestamp);
	}

	/// @dev Logs an allocation and transfers funds to an NGO-controlled payout wallet (not students).
	///      If you want allocations to be *pure logs only*, set payoutWallet = address(0) and it won't transfer.
	function allocateScholarship(
		string calldata studentId,
		uint256 amount,
		address payable payoutWallet
	) external onlyAdmin {
		require(bytes(studentId).length > 0, "StudentId empty");
		require(amount > 0, "Amount=0");
		require(address(this).balance >= amount, "Insufficient balance");

		allocations.push(
			Allocation({
				studentId: studentId,
				amount: amount,
				timestamp: block.timestamp,
				approvedBy: msg.sender
			})
		);
		totalAllocated += amount;

		if (payoutWallet != address(0)) {
			(bool ok, ) = payoutWallet.call{value: amount}("");
			require(ok, "Transfer failed");
		}

		emit ScholarshipAllocated(studentId, amount, block.timestamp, msg.sender);
	}

	function getAllAllocations() external view returns (Allocation[] memory) {
		return allocations;
	}

	function getAllocationsCount() external view returns (uint256) {
		return allocations.length;
	}

	function getContractBalance() external view returns (uint256) {
		return address(this).balance;
	}

	function changeAdmin(address newAdmin) external onlyAdmin {
		require(newAdmin != address(0), "Admin=0");
		address old = ngoAdmin;
		ngoAdmin = newAdmin;
		emit AdminChanged(old, newAdmin);
	}
}

