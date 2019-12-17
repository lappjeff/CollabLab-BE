require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dbConfig = require("./db/config");
const sessionConfig = require("./helpers/sessionConfig");
const passport = require("./routes/auth/passportConfig");
const MongoStore = require("connect-mongo")(session);

const authRouter = require("./routes/auth/authRoutes");

const app = express();

// mongoDB initial connection
mongoose
	.connect(process.env.MONGODB_URI, dbConfig)
	.then(res => {
		console.log("DB listening");
	})
	.catch(err => {
		console.log(err);
	});

app.use(express.json());

// Session connection with MongoDB database
app.use(
	session({
		...sessionConfig,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.status(200).json({ message: `Server running on port ${port}` });
});

app.listen(port, async () => {
	console.info(`Server running on port ${port}`);
});
