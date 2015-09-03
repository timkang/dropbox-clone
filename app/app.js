module.exports = function(config) {

	var
		logger = global.logger = require("./logger.js")(config.logger),
		mongoose = require("mongoose"),
		http = require("http"),
		express = require("express"),
		app = express(),
		multer = require("multer"),
		session = require('express-session'),
		cookieParser = require('cookie-parser'),
		passport = require("passport"),
		crypto = require("crypto"),
		bodyParser = require("body-parser"),
		fs = require("fs"),
		zlib = require("zlib"),
		BufferStream = require("./buffer-stream"),
		contentFolders = config.httpServer.contentFolders;

	// not needed because we are using watch which is async
	//this.async();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);


	app.use("/css", express.static(contentFolders.cssFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/css");
			if (/.gz.css$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));


	app.use("/js", express.static(contentFolders.jsFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/javascript");
			if (/.gz.js$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/libs", express.static(contentFolders.libsFolder));

	app.use("/api", bodyParser.json());

	// authenticate all API requests
	//app.use(require("./routers/authenticate"));

	// validate logged in and tokens for all API requests
	//app.use(require("./routers/api-request-validator"));

	// Custom Headers
	app.use("/api", function(req, res, next) {
		res.set("X-Custom-Header", req.get("X-Custom-Header"));
		next();
	});

	app.use("/api", multer({ dest: contentFolders.uploadsFolder }).single("file"));

	app.use("/api/upload", function(req, res) {
		console.log("api upload ");
		// console.dir(req.file);
		res.json({
			message: "upload successful!",
			filename: req.file.filename
		});
	});

	app.use("/api/delete", function(req,res){
		console.log("delete called");
		console.dir(req);
		console.log(req);
		// fs.unlink('/uploads/');
		res.json({
			message: "delet successfuled"
		});
	});

	app.use("/api", require("./routers/rest.js")("drobfile"));
	app.use("/api", require("./routers/rest.js")("account"));

	app.use("/", function(req, res) {
		//console.log("request made");
		//setTimeout(function() {
		//	console.log("responding to request");
			res.sendFile(config.httpServer.indexFile, function(err) {
				if (err) res.status(err.status).end();
			});
		//}, 2000);
	});

	http.createServer(app).listen(config.httpServer.port, function() {
		logger.info("web server running on port: " + config.httpServer.port);
		logger.error("the world has ended...");
	});
};
