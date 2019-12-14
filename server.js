const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth/authRoutes");
const app = express();

mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.status(200).json({ message: `Server running on port ${port}` });
});

app.listen(port, () => {
	console.info(`Server running on port ${port}`);
});
