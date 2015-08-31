define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({

		idAttribute: "_id",
		urlRoot: "/api/accounts",

    defaults: {
			name: undefined,
			sizeinBytes: undefined,
			uploaded: undefined,
			description: undefined
		},

		// custom stuff

		getName: function() {
			return this.get("firstName") + " " + this.get("lastName");
		}

	})

});
