const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
	{
		donorAddress: { type: String, required: true, trim: true },
		amountWei: { type: String, required: true },
		transactionHash: { type: String, required: true, unique: true, trim: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);

