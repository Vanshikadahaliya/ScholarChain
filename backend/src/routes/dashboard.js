const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const Donation = require("../models/Donation");
const Scholarship = require("../models/Scholarship");
const Student = require("../models/Student");
const { getContract } = require("../services/scholarChain");

const router = express.Router();

router.get("/", requireAuth, requireRole(["admin", "staff"]), async (req, res, next) => {
	try {
		const [donationsCount, allocationsCount, studentsCount] = await Promise.all([
			Donation.countDocuments(),
			Scholarship.countDocuments(),
			Student.countDocuments()
		]);

		const contract = getContract(true);
		const [totalDonations, totalAllocated, contractBalance, ngoAdmin] = await Promise.all([
			contract.totalDonations(),
			contract.totalAllocated(),
			contract.getContractBalance(),
			contract.ngoAdmin()
		]);

		return res.json({
			counts: { donationsCount, allocationsCount, studentsCount },
			onchain: {
				ngoAdmin,
				totalDonationsWei: totalDonations.toString(),
				totalAllocatedWei: totalAllocated.toString(),
				contractBalanceWei: contractBalance.toString()
			}
		});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

