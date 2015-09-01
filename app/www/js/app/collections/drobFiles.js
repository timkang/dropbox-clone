define(["backbone", "app/models/drobfile"], function(Backbone, Drobfile) {

	return Backbone.Collection.extend({
		model: Drobfile,
		url: "/api/drobfiles"
	});

});
