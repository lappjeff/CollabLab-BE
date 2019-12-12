const router = require("express").Router();
const passport = require("./passportConfig");
const qs = require("query-string");
require("dotenv").config();

const scope = ["user-read-private", "user-read-email"];

router.use(passport.initialize());
router.use(passport.session());

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
		res.redirect(`tokens?${tokenString}`);
	}
);

router.get("/tokens", (req, res) => {
	const tokenString = qs.stringify(req.query);

	res.redirect(`http://localhost:3000?${tokenString}`);
});
module.exports = router;
