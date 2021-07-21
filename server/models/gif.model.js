const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const gifRoute = process.env.IMAGE_ROUTE;

const gifSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide a title for this gif"],
			maxlength: 80,
		},
		tags: {
			type: Array,
			required: [true, "Please provide atleat one tag"],
			index: true,
		},
		gifUrl: { type: String, required: true },
		previewUrl: { type: String, required: true },
		description: { type: String, required: false },
		catagories: {
			type: Array,
			required: [true, "Please provie atleast one category"],
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

// Replace url keys with full url
gifSchema.post("init", function (doc) {
	this.previewUrl = gifRoute + doc.previewUrl;
	this.gifUrl = gifRoute + doc.gifUrl;
});

const Gif = mongoose.model("Gif", gifSchema);

module.exports = Gif;
