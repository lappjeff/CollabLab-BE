require("dotenv").config();
const qs = require("query-string");
const router = require("express").Router();
const passport = require("./passportConfig");

const scope = ["user-read-private", "user-read-email"];

const isAuthenticated = (req, res, next) => {
	if (req.user) return next();
	else
		return res.status(401).json({
			error: "User not authenticated"
		});
};

router.get("/checkauth", isAuthenticated, function(req, res) {
	res.status(200).json({
		status: "Login successful!",
		user: req.user
	});
});

router.get(
	"/spotify",
	passport.authenticate("spotify", {
		scope,
		failureRedirect: "http://localhost:3000",
		showDialog: true
	}),
	(req, res) => {}
);

router.get(
	"/callback",
	passport.authenticate("spotify", {
		failureRedirect: "/fail"
	}),
	(req, res) => {
		const tokenString = qs.stringify(req.user);
		res.redirect(`http://localhost:3000?${tokenString}`);
	}
);

module.exports = router;
