const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
	{
		scholarshipId: { type: String, required: true, unique: true, trim: true },
		studentId: { type: String, required: true, trim: true },
		amountWei: { type: String, required: true },
		status: { type: String, enum: ["allocated", "cancelled"], default: "allocated" },
		transactionHash: { type: String, required: true, unique: true, trim: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);

