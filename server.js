require("dotenv").config();
const connectDb = require("./db/connect");
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

app.get("/", (req, res) => {
	res.status(200).json({ message: `Server running on port ${port}` });
});

app.listen(port, async () => {
	await connectDb();
	console.info(`Server running on port ${port}`);
});
