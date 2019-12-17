require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const config = {
	secret: "session pain",
	cookie: { maxAge: 3600000 },
	saveUninitialized: false,
	resave: false
};

if (process.env.ENV === "production") config.cookie.secure = true;

module.exports = config;
