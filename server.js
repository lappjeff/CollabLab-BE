const express = require("express");
const session = require("express-session");
const sessionConfig = require("./helpers/sessionConfig");
const passport = require("./routes/auth/passportConfig");
const authRouter = require("./routes/auth/authRoutes");

const app = express();

app.use(express.json());

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.info(`Server running on port ${port}`);
});
