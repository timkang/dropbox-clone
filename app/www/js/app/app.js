(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController",
		 "app/routers/accountRouter", "app/collections/drobfiles"
	];

	function app($, _, Backbone, AppController, AccountRouter, Drobfiles) {

		var appController = new AppController(new AccountRouter());
		appController.start("");

		// Backbone.history.start({pushState: true});

	//	var drobfiles = new Drobfiles();
		// drobfiles.fetch({ success: function(collection) {
		// //	console.dir(collection);
		// }});
	}

	define(dependencies, app);

})();
