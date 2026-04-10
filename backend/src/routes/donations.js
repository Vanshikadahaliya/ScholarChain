const express = require("express");
const { z } = require("zod");

const Donation = require("../models/Donation");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

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
				transactionHash: z.string().min(1)
			});
			const body = schema.parse(req.body);

			const doc = await Donation.create(body);
			return res.status(201).json({ donation: doc });
		} catch (err) {
			return next(err);
		}
	}
);

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

