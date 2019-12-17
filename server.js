require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connectDB");
const passport = require("./routes/auth/passportConfig");
const sessionInstance = require("./helpers/sessionCreate");

const authRouter = require("./routes/auth/authRoutes");

const app = express();

// mongoDB initial connection
connectDB();
// Session connection with MongoDB database
app.use(sessionInstance);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.status(200).json({ message: `Server running on port ${port}` });
});

app.listen(port, async () => {
	console.info(`Server running on port ${port}`);
});
