const qs = require("query-string");
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());

const scope = "user-read-private user-read-email";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.get("/", async (req, res) => {
	const params = qs.stringify({
		response_type: "code",
		redirect_uri: process.env.REDIRECT_URI,
		client_id,
		scope
	});

	try {
		res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
	} catch (err) {
		console.err(err);
		res.status(500).end();
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.info(`Server running on port ${port}`);
});
