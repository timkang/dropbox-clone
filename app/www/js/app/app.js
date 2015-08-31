(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController",
		 "app/routers/accountRouter"
	];

	function app($, _, Backbone, AppController, AccountRouter) {

		var appController = new AppController(new AccountRouter());
		appController.start("");

		// Backbone.history.start({pushState: true});
	}

	define(dependencies, app);

})();
