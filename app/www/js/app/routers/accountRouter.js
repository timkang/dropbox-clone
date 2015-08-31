(function() {

	var dependencies = ["jquery", "underscore", "backbone"];

	function accountRouter($, _, Backbone) {

		return Backbone.Router.extend({

			routes: {
				"accounts": "listAccounts",
				"accounts/(:id/)edit": "editAccount",
				"accounts/:id": "viewAccount",
				"drob": "drobFile"
			},

			listAccounts: function() {
				this.trigger("list-accounts");
			},

			viewAccount: function(id) {
				console.log("view account triggered");
				this.trigger("view-account", id);
			},

			editAccount: function(id) {
				if (id) {
					this.trigger("edit-account", id);
				} else {
					this.trigger("create-account");
				}
			},

			drobFile: function() {
				console.log("drobfile");
				this.trigger("drob-file");
			}

		});

	}

	define(dependencies, accountRouter);

})();
