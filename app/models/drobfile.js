var
	mongoose = require("mongoose"),

	drobfileSchema = mongoose.Schema({
		fileName: String,
		sizeInBytes: String,
		uploaded: String,
		description: String,
		nameOnFS: String
	}),

	DrobfileModel = mongoose.model("drobfile", drobfileSchema);

module.exports = DrobfileModel;
