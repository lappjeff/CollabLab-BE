require("dotenv").config();
const config = {
	secret: "session pain",
	cookie: { maxAge: 3600000 },
	saveUninitialized: false,
	resave: false
};

if (process.env.ENV === "production") config.cookie.secure = true;

module.exports = config;
