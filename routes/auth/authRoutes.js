const router = require("express").Router();
const qs = require("query-string");
const axios = require("axios");
require("dotenv").config();

const scope = "user-read-private user-read-email";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

console.log(process.env.REDIRECT_URI);

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
			.status(status || 200)
			.cookie("spotifyAccessToken", accessToken, { maxAge: 34000 })
			// .json({ accessToken, refreshToken });
			.redirect("localhost:3000");
	} catch (err) {
		res.status(err.response.status).json({
			message: err.response.statusText,
			error: err.response.data.error_description
		});
	}
});

module.exports = router;
