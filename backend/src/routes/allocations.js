const express = require("express");
const { z } = require("zod");
const { ethers } = require("ethers");

const Scholarship = require("../models/Scholarship");
const Student = require("../models/Student");
const { requireAuth, requireRole } = require("../middleware/auth");
const { getContract } = require("../services/scholarChain");

const router = express.Router();

// Admin allocation: backend submits tx (optional) and stores tx hash in MongoDB.
router.post("/", requireAuth, requireRole(["admin"]), async (req, res, next) => {
	try {
		if (!process.env.NGO_ADMIN_PRIVATE_KEY) {
			return res.status(400).json({
				error: "Backend allocation is disabled (set NGO_ADMIN_PRIVATE_KEY). Use MetaMask allocation flow instead."
			});
		}

		const schema = z.object({
			scholarshipId: z.string().min(1),
			studentId: z.string().min(1),
			amountEth: z.string().min(1),
			payoutWallet: z.string().min(1)
		});
		const body = schema.parse(req.body);

		const student = await Student.findOne({ studentId: body.studentId });
		if (!student) return res.status(404).json({ error: "Student not found" });
		if (student.status !== "verified") return res.status(400).json({ error: "Student not verified" });

		const contract = getContract(false);
		const amountWei = ethers.parseEther(body.amountEth);

		const tx = await contract.allocateScholarship(body.studentId, amountWei, body.payoutWallet);
		const receipt = await tx.wait();

		const scholarship = await Scholarship.create({
			scholarshipId: body.scholarshipId,
			studentId: body.studentId,
			amountWei: amountWei.toString(),
			status: "allocated",
			transactionHash: receipt.hash
		});

		return res.status(201).json({ scholarship, txHash: receipt.hash });
	} catch (err) {
		return next(err);
	}
});

// MetaMask allocation flow: backend only records the tx hash + metadata after the admin submits on-chain.
router.post("/record", requireAuth, requireRole(["admin"]), async (req, res, next) => {
	try {
		const schema = z.object({
			scholarshipId: z.string().min(1),
			studentId: z.string().min(1),
			amountWei: z.string().min(1),
			transactionHash: z.string().min(1)
		});
		const body = schema.parse(req.body);

		const student = await Student.findOne({ studentId: body.studentId });
		if (!student) return res.status(404).json({ error: "Student not found" });
		if (student.status !== "verified") return res.status(400).json({ error: "Student not verified" });

		const scholarship = await Scholarship.create({
			scholarshipId: body.scholarshipId,
			studentId: body.studentId,
			amountWei: body.amountWei,
			status: "allocated",
			transactionHash: body.transactionHash
		});

		return res.status(201).json({ scholarship });
	} catch (err) {
		return next(err);
	}
});

router.get("/transactions", requireAuth, requireRole(["admin", "staff"]), async (req, res, next) => {
	try {
		const allocations = await Scholarship.find().sort({ createdAt: -1 }).lean();
		return res.json({ allocations });
	} catch (err) {
		return next(err);
	}
});

// On-chain audit (read-only): pulls allocations list from the contract.
router.get("/audit/onchain", requireAuth, requireRole(["admin", "staff"]), async (req, res, next) => {
	try {
		const contract = getContract(true);
		const allocations = await contract.getAllAllocations();
		return res.json({
			allocations: allocations.map((a) => ({
				studentId: a.studentId,
				amountWei: a.amount.toString(),
				timestamp: Number(a.timestamp),
				approvedBy: a.approvedBy
			}))
		});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

