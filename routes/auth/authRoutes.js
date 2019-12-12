const router = require("express").Router();
const qs = require("query-string");
const axios = require("axios");
require("dotenv").config();

const scope = "user-read-private user-read-email";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

router.get("/login", async (req, res) => {
	const params = qs.stringify({
		response_type: "code",
		redirect_uri: process.env.REDIRECT_URI,
		client_id,
		scope
	});

	try {
		res.redirect(`https://accounts.spotify.com/authorize?${params}`);
		res.status(200).end();
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
});

router.get("/callback", async (req, res) => {
	try {
		const code = req.query.code;

		const requestBody = qs.stringify({
			grant_type: "authorization_code",
			redirect_uri: process.env.REDIRECT_URI,
			code,
			client_id,
			client_secret
		});
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
			.cookie("spotifyAccessToken", accessToken, { maxAge: 3600000 })
			.cookie("spotifyRefreshToken", refreshToken)
			.redirect("http://localhost:3000")
			.status(status || 200);
	} catch (err) {
		res.status(err.response.status || 500).json({
			message: err.response.statusText || "Error ",
			error: err.response.data.error_description || "Unknown Error Occurred"
		});
	}
});

module.exports = router;
