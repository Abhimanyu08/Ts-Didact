const path = require("path");
module.exports = {
	entry: "./lib/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "build-1.js",
	},
	mode: "development",
};
