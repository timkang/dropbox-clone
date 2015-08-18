module.exports = function(grunt) {

	grunt.initConfig({
		webServer: {
			port: 8080,
			rootFolder: "app/www"
		},
	});

	grunt.registerTask("default", "start a web server", function() {

		var
			http = require("http"),
			express = require("express"),
			app = express(),
			webServerConfig = grunt.config("webServer");

		this.async();

		app.use(express.static(webServerConfig.rootFolder));

		http.createServer(app).listen(webServerConfig.port, function() {
			console.log("web server running on port: " + webServerConfig.port);
		});

	});

};
