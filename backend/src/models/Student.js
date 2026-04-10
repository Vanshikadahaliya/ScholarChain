const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
	{
		studentId: { type: String, required: true, unique: true, trim: true },
		name: { type: String, required: true, trim: true },
		documents: [{ type: String }],
		status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

