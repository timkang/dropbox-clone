define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({

		defaults: {
			name: undefined,
			sizeinBytes: undefined,
			uploaded: undefined,
			description: undefined
		},

		getDownloadUrl: function() {
			return "";
		}

	});

});
