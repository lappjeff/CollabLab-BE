require("dotenv").config();
const config = require("./config");
const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, config);
		console.log(`DB listening at url ${process.env.MONGODB_URI}`);
		return mongoose.connection;
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDb;
