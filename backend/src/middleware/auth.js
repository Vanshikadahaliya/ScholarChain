const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
	const header = req.headers.authorization || "";
	const token = header.startsWith("Bearer ") ? header.slice(7) : "";
	if (!token) return res.status(401).json({ error: "Missing token" });

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		return next();
	} catch {
		return res.status(401).json({ error: "Invalid token" });
	}
}

function requireRole(roles) {
	const allowed = Array.isArray(roles) ? roles : [roles];
	return (req, res, next) => {
		if (!req.user) return res.status(401).json({ error: "Unauthorized" });
		if (!allowed.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
		return next();
	};
}

module.exports = { requireAuth, requireRole };

