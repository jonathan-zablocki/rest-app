const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
	res.send("We are on home");
});

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
	console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
	console.log("mongoose is connected");
});

//
if (process.env.NODE_ENV === "production") {
}

// How to listen to server
app.listen(PORT, console.log("Server starting at " + PORT));
