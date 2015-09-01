define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({

		idAttribute: "_id",
		urlRoot: "/api/drobfiles",

    defaults: {
			fileName: undefined,
			sizeInBytes: undefined,
			uploaded: undefined,
			description: undefined
		},

		// custom stuff

		getName: function() {
			return this.get("firstName") + " " + this.get("lastName");
		}

	})

});
