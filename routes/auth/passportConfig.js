const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.REDIRECT_URI;

passport.serializeUser((obj, done) => {
	done(null, obj);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});
passport.use(
	new SpotifyStrategy(
		{ clientID, clientSecret, callbackURL },
		(accessToken, refreshToken, expiresIn, profile, done) => {
			const tokens = { accessToken, refreshToken };
			return done(null, tokens);
		}
	)
);

module.exports = passport;
