const qs = require("query-string");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

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
		res.redirect(`https://accounts.spotify.com/authorize?${params}`);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

app.get("/callback", async (req, res) => {
	const code = req.query.code;

	const requestBody = qs.stringify({
		grant_type: "authorization_code",
		redirect_uri: process.env.REDIRECT_URI,
		code,
		client_id,
		client_secret
	});

	try {
		const response = await axios({
			method: "post",
			url: "https://accounts.spotify.com/api/token",
			data: requestBody,
			headers: {
				"content-type": "application/x-www-form-urlencoded;charset=utf-8"
			}
		});

		const {
			access_token: accessToken,
			refresh_token: refreshToken
		} = response.data;

		const status = response.status;

		res
			.status(status || 200)
			.cookie("spotifyAccessToken", accessToken, { maxAge: 34000 })
			.json({ accessToken, refreshToken });
	} catch (err) {
		res.status(err.response.status).json({
			message: err.response.statusText,
			error: err.response.data.error_description
		});
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.info(`Server running on port ${port}`);
});
