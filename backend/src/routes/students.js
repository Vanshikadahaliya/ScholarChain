const express = require("express");
const { z } = require("zod");

const Student = require("../models/Student");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, requireRole(["admin", "staff"]), async (req, res, next) => {
	try {
		const students = await Student.find().sort({ createdAt: -1 }).lean();
		return res.json({ students });
	} catch (err) {
		return next(err);
	}
});

const createSchema = z.object({
	studentId: z.string().min(1),
	name: z.string().min(1)
});

router.post("/", requireAuth, requireRole(["admin", "staff"]), async (req, res, next) => {
	try {
		const body = createSchema.parse(req.body);
		const exists = await Student.findOne({ studentId: body.studentId });
		if (exists) return res.status(409).json({ error: "StudentId already exists" });

		const student = await Student.create({
			studentId: body.studentId,
			name: body.name,
			documents: [],
			status: "pending"
		});
		return res.status(201).json({ student });
	} catch (err) {
		return next(err);
	}
});

router.patch("/:studentId/status", requireAuth, requireRole(["admin"]), async (req, res, next) => {
	try {
		const schema = z.object({ status: z.enum(["pending", "verified", "rejected"]) });
		const body = schema.parse(req.body);
		const student = await Student.findOneAndUpdate(
			{ studentId: req.params.studentId },
			{ status: body.status },
			{ new: true }
		);
		if (!student) return res.status(404).json({ error: "Student not found" });
		return res.json({ student });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

