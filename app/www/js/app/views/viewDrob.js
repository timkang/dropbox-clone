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
				"dragover [data-drobbable]": "drobDragover"
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
