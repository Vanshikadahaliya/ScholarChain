const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const User = require("../models/User");

const router = express.Router();

const registerSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
	role: z.enum(["donor", "admin", "staff", "student"])
});

router.post("/register", async (req, res, next) => {
	try {
		const body = registerSchema.parse(req.body);
		const exists = await User.findOne({ email: body.email });
		if (exists) return res.status(409).json({ error: "Email already registered" });

		const passwordHash = await bcrypt.hash(body.password, 12);
		const user = await User.create({
			name: body.name,
			email: body.email,
			passwordHash,
			role: body.role
		});

		return res.status(201).json({ userId: String(user._id) });
	} catch (err) {
		return next(err);
	}
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});

router.post("/login", async (req, res, next) => {
	try {
		const body = loginSchema.parse(req.body);
		const user = await User.findOne({ email: body.email });
		if (!user) return res.status(401).json({ error: "Invalid credentials" });

		const ok = await bcrypt.compare(body.password, user.passwordHash);
		if (!ok) return res.status(401).json({ error: "Invalid credentials" });

		const token = jwt.sign(
			{ userId: String(user._id), role: user.role, email: user.email, name: user.name },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		return res.json({ token, role: user.role, name: user.name, email: user.email });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

