// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
	const dateParam = req.params.date;
	let date;

	if (!dateParam) {
		// If no date provided, use current date
		date = new Date();
	} else if (/^\d+$/.test(dateParam)) {
		// If input is unix timestamp
		date = new Date(Number.parseInt(dateParam));
	} else {
		// If input is date string
		date = new Date(dateParam);
	}

	if (date.toString() === "Invalid Date") {
		res.json({ error: "Invalid Date" });
	} else {
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
	}
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
