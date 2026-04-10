const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const { connectDb } = require("./services/db");
const { errorHandler, notFound } = require("./middleware/errors");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const donationRoutes = require("./routes/donations");
const allocationRoutes = require("./routes/allocations");
const dashboardRoutes = require("./routes/dashboard");

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true, service: "scholarchain-backend" }));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/donate", donationRoutes);
app.use("/allocate", allocationRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);

connectDb()
	.then(() => {
		app.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(`Backend listening on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error("Failed to start server:", err);
		process.exit(1);
	});

