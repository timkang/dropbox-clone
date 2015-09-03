define(["underscore", "backbone", "app/models/account",
				"app/views/editAccount", "app/views/viewAccount", "app/views/viewDrob",
				 "app/models/drobfile", "app/collections/drobfiles"],
	function(_, Backbone, Account, EditAccount, ViewAccount, ViewDrob, DrobFile, DrobCollection) {

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

			};

			controller.listenTo(router, "view-account", function(accountId) {
				fetchAccount(accountId, controller.viewAccount);
			});

			controller.listenTo(router, "edit-account", function(accountId) {
				fetchAccount(accountId, controller.editAccount);
			});


			this.listAccounts = function() {
				console.log("list accounts");
			};

			this.deleteAccount = function(account) {
				account.destroy({
					success: function(model, response, options) {
						this.listAccounts();
					}
				});
			};

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

				var queryId = model.get('_id');

				var deleteButton = $('button');

				var mystring = "<tr>" +
				"<td>" + model.get('fileName') + "</td> " +
				"<td>" + model.get('sizeInBytes') + "</td> " +
				"<td>" + model.get('uploaded') + "</td> " +
				"<td>" + model.get('description') + "</td> " +
				"<td><span id=" + queryId + "><button type='button' class='viewsb' edibuton>edit</button>" +
						"<button type='button' class='viewsb' delbuton>delete</button>" +
						"<button type='button' class='editsb' savbuton>save</button>" +
						"<button type='button' class='editsb' canbuton>cancel</button></span></td>" +
				"</tr>";
				return mystring;
			};

			this.deleteFile = function(buttonClicked){

				var queryId = buttonClicked.parentNode.id;
				var fileclose = buttonClicked.closest("tr");

				var file = new DrobFile({
					_id: queryId
				});

				file.fetch({
					success: function(model, response, options) {
						file.destroy({
							success: function(model, response, options) {
								fileclose.remove();
							}
						});
					}
				});


				console.log(buttonClicked.id + " is getting deleted");
			};

			this.editFile = function(buttonClicked){
				var queryId = buttonClicked.parentNode.id;
				var fileclose = buttonClicked.closest("tr");

				var filenameTd = fileclose.getElementsByTagName("td")[0];
				var descriptionTd = fileclose.getElementsByTagName("td")[3];

				var originalFilename = filenameTd.innerHTML;
				var originalDescription = descriptionTd.innerHTML;

				filenameTd.innerHTML = "<input></input>";
				descriptionTd.innerHTML = "<input></input>";

				filenameTd.getElementsByTagName("input")[0].value = originalFilename;
				descriptionTd.getElementsByTagName("input")[0].value = originalDescription;

				fileclose.getElementsByClassName("editsb")[0].style.display = "inline";
				fileclose.getElementsByClassName("editsb")[1].style.display = "inline";
				fileclose.getElementsByClassName("viewsb")[0].style.display = "none";
				fileclose.getElementsByClassName("viewsb")[1].style.display = "none";

				controller.listenTo(currentView, "save-file", function(filename) {
					this.saveFile(filename);
				});

				controller.listenTo(currentView, "cancel-file", function(filename) {
					var drobfiles = new DrobCollection();
					drobfiles.fetch({ success: function(collection) {
						controller.viewDrob(drobfiles);
					}});
				});

				console.log("edit button clicked");
			};

			this.saveFile = function(buttonClicked){
				var queryId = buttonClicked.parentNode.id;
				var fileclose = buttonClicked.closest("tr");

				var filenameNew = fileclose.getElementsByTagName("input")[0].value;
				var descriptionNew = fileclose.getElementsByTagName("input")[1].value;

				console.log("queryId is " + queryId);

				var drobfile = new DrobFile({
					_id: queryId
				});

				//save to the database
				drobfile.fetch({
					success: function(model, response, options){
						model.set("fileName", filenameNew);
						model.set("description", descriptionNew);

						console.dir(model);
						console.log("edit fetched");

						model.save(null, {
							success: function(model, response, options){
								console.log("edited description saved");
								//refresh the view
								var drobfiles = new DrobCollection();
								drobfiles.fetch({ success: function(collection) {
									controller.viewDrob(drobfiles);
								}});
							}
						});
					}
				});



				console.log("save button clicked");
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

				controller.listenTo(currentView, "delete-file", function(filename) {
					this.deleteFile(filename);
				});

				controller.listenTo(currentView, "edit-file", function(filename) {
					this.editFile(filename);
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
