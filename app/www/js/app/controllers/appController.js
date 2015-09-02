define(["underscore", "backbone", "app/models/account", "app/models/drobFile",
				"app/views/editAccount", "app/views/viewAccount", "app/views/viewDrob",
				 "app/models/drobfile", "app/collections/drobfiles"],
	function(_, Backbone, Account, DrobFile, EditAccount, ViewAccount, ViewDrob, DrobFile, DrobCollection) {

		return function(router) {

			_.extend(this, Backbone.Events);

			var currentView = null;
			var controller = this;

			function fetchAccount(accountId, cb) {
				var account = new Account({
					_id: accountId
				});
				account.fetch({
					success: function(model, response, options) {
						cb(model);
					}
				});
			}

			function fetchDrob(cb) {
				var drobCollection = new DrobCollection();
				drobCollection.fetch({
					success: function(collection, response, options) {
					  console.dir("fetch drp collection: " + collection);
						cb(collection);
					}
				});
			}

			this.uploadDrob = function (files) {
				//add our collection here
				var fd = new FormData();
				// for (var x=0; x<files.length; x++) {
				// 	fd.append("file-" + x, files[x]);
				// }
				fd.append("file", files[0]);

				var xhr = new XMLHttpRequest();

				xhr.addEventListener("readystatechange", function() {

					if (xhr.readyState === 4 && xhr.status !== 200) {
						console.log("error occurred");
						console.dir(xhr);
					}

					if (xhr.readyState === 4 && xhr.status === 200) {
						//console.log(JSON.parse(xhr.responseText));

						var drobfile = new DrobFile({
							fileName: files[0].name,
							sizeInBytes: files[0].size,
							uploaded: new Date(),
							description: "nothing yet"
						});

						drobfile.save(null, {
							success: function(model, response, options){
								console.dir(model);
								console.log("success!");
								$("#ericg").append(controller.createRow(model));
							},
							error: function(model, response, options){
								console.dir(model);
								console.log("error!");
							}
						});



						var parser = new DOMParser();
						console.log(parser.parseFromString(xhr.responseText, "application/xml"));
					}

				});

				xhr.open("POST", "/api/upload");
				xhr.send(fd);

			}

			controller.listenTo(router, "view-account", function(accountId) {
				fetchAccount(accountId, controller.viewAccount);
			});

			controller.listenTo(router, "edit-account", function(accountId) {
				fetchAccount(accountId, controller.editAccount);
			});


			this.listAccounts = function() {
				console.log("list accounts");
			}

			this.deleteAccount = function(account) {
				account.destroy({
					success: function(model, response, options) {
						this.listAccounts();
					}
				});
			}

			this.saveAccount = function(account) {

				var account = new Account(account);

				account.save(null, {
					success: function(model, response, options) {
						console.log("account saved");
						console.dir(model);
						controller.viewAccount(model);
					},
					error: function(model, response, options) {
						console.log("account not saved");
					}
				});
			};

			this.viewAccount = function(model) {

				if (currentView) {
					currentView.remove();
				}

				currentView = new ViewAccount({
					model: model
				});

				controller.listenTo(currentView, "edit-account", function(accountModel) {
					this.editAccount(accountModel);
				});

				controller.listenTo(currentView, "list-accounts", function(accountModel) {
					this.listAccounts();
				});

				$("#app").append(currentView.render());

				router.navigate("/accounts/" +
					encodeURIComponent(model.id));
			};

			this.editAccount = function(model) {

				if (currentView) {
					currentView.remove();
				}

				currentView = new EditAccount({
					model: model
				});

				controller.listenTo(currentView, "save-account", function(accountAttributes) {
					this.saveAccount(accountAttributes);
				});

				controller.listenTo(currentView, "delete-account", function(accountModel) {
					this.deleteAccount(accountModel);
				});

				controller.listenTo(currentView, "view-account", function(accountModel) {
					this.viewAccount(accountModel);
				});

				$("#app").append(currentView.render());

				router.navigate("/accounts/" +
					encodeURIComponent(model.id) + "/edit");
			};

			this.createRow = function(model){
				var mystring = "<tr>"
				+ "<td>" + model.get('fileName') + "</td> "
				+ "<td>" + model.get('sizeInBytes') + "</td> "
				+ "<td>" + model.get('uploaded') + "</td> "
				+ "<td>" + model.get('description') + "</td> "
				+ "<td><button type='button' edibuton>edit</button>"
				+ "<button type='button' delbuton>delete</button></td>"
				+ "</tr>";
				return mystring;
			};

			this.viewDrob = function(model) {

				console.dir("view drob model: " + model);

				if (currentView) {
					currentView.remove();
				}

				currentView = new ViewDrob({
					model: model
				});

				controller.listenTo(currentView, "drob-file", function(files) {
					controller.uploadDrob(files);
					// fetchDrob(this.viewDrob);
				});


				var ustin = "";

				model.forEach(function(filemodel){
					console.log(filemodel);
					ustin += controller.createRow(filemodel);
				});

				$("#app").append(currentView.render());
				$("#ericg").append(ustin);

				// router.navigate("/accounts/" +
				// 	encodeURIComponent(model.id));
			};


			this.start = function() {
				console.log("start");
				//this.listAccounts();
				var drobfiles = new DrobCollection();
				drobfiles.fetch({ success: function(collection) {
					console.dir(collection);
					controller.viewDrob(drobfiles);
				}});


			};

		};


	});
