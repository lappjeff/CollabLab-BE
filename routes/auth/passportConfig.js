const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.REDIRECT_URI;

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new SpotifyStrategy(
		{ clientID, clientSecret, callbackURL },
		(accessToken, refreshToken, expiresIn, profile, done) => {
			const tokens = { accessToken, refreshToken };
			const returnData = { tokens, expiresIn, profile };
			return done(null, returnData);
		},
		{ failureMessage: true, successMessage: true }
	)
);

module.exports = passport;
