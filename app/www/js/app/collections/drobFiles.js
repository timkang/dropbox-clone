define(["backbone", "app/models/drobFile"], function(Backbone, DrobFile) {

	return Backbone.Collection.extend({
		model: DrobFile,
		url: "/api/drobFiles"
	});

});
