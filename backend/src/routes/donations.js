const express = require("express");
const { z } = require("zod");

const Donation = require("../models/Donation");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();
const PROGRAM_KEYS = ["education", "skills", "healthcare", "general"];

// The actual ETH transfer is done in MetaMask; backend just records the resulting tx hash.
router.post(
	"/",
	requireAuth,
	requireRole(["donor", "admin", "staff"]),
	async (req, res, next) => {
		try {
			const schema = z.object({
				donorAddress: z.string().min(1),
				amountWei: z.string().min(1),
				transactionHash: z.string().min(1),
				program: z.enum(PROGRAM_KEYS).optional()
			});
			const body = schema.parse(req.body);

			const doc = await Donation.create(body);
			return res.status(201).json({ donation: doc });
		} catch (err) {
			return next(err);
		}
	}
);

router.get("/summary", async (req, res, next) => {
	try {
		const rows = await Donation.aggregate([
			{
				$group: {
					_id: "$program",
					totalWei: { $sum: { $toDecimal: "$amountWei" } },
					donationsCount: { $sum: 1 }
				}
			}
		]);

		const summary = PROGRAM_KEYS.reduce((acc, key) => {
			acc[key] = { totalWei: "0", donationsCount: 0 };
			return acc;
		}, {});

		for (const row of rows) {
			const key = row?._id || "general";
			if (!summary[key]) summary[key] = { totalWei: "0", donationsCount: 0 };
			summary[key] = {
				totalWei: row.totalWei ? row.totalWei.toString() : "0",
				donationsCount: Number(row.donationsCount || 0)
			};
		}

		return res.json({ summary });
	} catch (err) {
		return next(err);
	}
});

router.get(
	"/transactions",
	requireAuth,
	requireRole(["admin", "staff"]),
	async (req, res, next) => {
		try {
			const donations = await Donation.find().sort({ createdAt: -1 }).lean();
			return res.json({ donations });
		} catch (err) {
			return next(err);
		}
	}
);

module.exports = router;

