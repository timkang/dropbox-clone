(function() {

	var dependencies = [
		"jquery", "handlebars", "underscore",
		"backbone", "app/app.templates.hbs"
	];

	function viewDrob($, Handlebars, _, Backbone, templates) {

		return Backbone.View.extend({

			id: "drob-view",
			tagName: "div",

			events: {
				"drop [data-drobbable]": "drobData",
				"dragover [data-drobbable]": "drobDragover",
				"click [delbuton]": "drobDelete",
				"click [edibuton]": "drobEdit",
				"click [savbuton]": "drobSave",
				"click [canbuton]": "drobCancel"

			},

			drobSave: function(e) {
				console.log("drob save called");
				this.trigger("save-file", e.target);
			},

			drobCancel: function(e) {
				console.log("drob cancel called");
				this.trigger("cancel-file", e.target);
			},

			drobDelete: function(e) {
				console.log("drob deleted called");
				this.trigger("delete-file", e.target);
			},

			drobEdit: function(e) {
				console.log("drob edit called");
				this.trigger("edit-file", e.target);
			},

			drobData: function(e) {
				e.preventDefault();
				var files = e.originalEvent.dataTransfer.files;
				this.trigger("drob-file", files);
			},

			drobDragover: function(e) {
				e.preventDefault();
			},

			// listAccounts: function() {
			// 	this.trigger("list-accounts", this.model);
			// },

			template: function(model) {
				return templates["viewDrob"](model);
			},

			render: function() {
				this.$el.append(this.template(this.model.toJSON()));
				return this.$el;
			}

		});

	}

	define(dependencies, viewDrob);

})();
