module.exports = function(grunt) {

	var
		path = require("path"),
		wwwFolder = path.join("app", "www"),
		cssFolder = path.join(wwwFolder, "css"),
		cssMinFiles = {},
		cssCompressFiles = {};

	cssMinFiles[path.join(cssFolder, "/site.min.css")] =
		path.join(cssFolder, "/site.css");

	cssCompressFiles[path.join(cssFolder, "/site.min.gz.css")] =
		path.join(cssFolder, "/site.min.css");

	grunt.initConfig({
		webServer: {
			port: 8080,
			rootFolder: wwwFolder
		},
		cssmin: {
			main: {
        options: {
          keepSpecialComments: 0,
          sourceMap: false
        },
				files: cssMinFiles
			}
		},
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: cssCompressFiles
      }
    },
		watch: {
      css: {
				files: path.join(cssFolder, "**", "*.css"),
				tasks: ["cssmin","compress:css"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.registerTask("web-server", "start a web server", function() {

		var
			http = require("http"),
			express = require("express"),
			path = require("path"),
			app = express(),
			webServerConfig = grunt.config("webServer");

		// disable since the watch task is running
		//this.async();

		// configuration to support css gzip compression
		app.use("/css", express.static(path.join(webServerConfig.rootFolder, "css"), {
			setHeaders: function(res, filePath) {
				res.setHeader("Content-Type", "text/css");
				if (/.gz.css$/.test(filePath)) {
					res.setHeader("Content-Encoding", "gzip");
				}
			}
		}));

		// default
		app.use(express.static(webServerConfig.rootFolder));

		http.createServer(app).listen(webServerConfig.port, function() {
			console.log("web server running on port: " + webServerConfig.port);
		});

	});

	grunt.registerTask("default", "start development environment",
		[ "cssmin", "compress", "web-server", "watch"]);


};
