define(["app-amd/constants", "app-amd/init", "app-amd/i18n!app-amd/nls/label"],
	function(constants, init, label) {

		console.log(constants.url);
		console.log(label.greeting);

		init.doSomething();

		console.log("app loaded...");

	});
