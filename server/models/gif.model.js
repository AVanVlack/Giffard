const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gifSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide a title for this gif"],
			maxlength: 80,
		},
		tags: { type: Array, required: false },
		gifUrl: { type: String, required: true },
		previewUrl: { type: String, required: true },
		description: { type: String, required: false },
		catagories: { type: Array, required: false },
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

const Gif = mongoose.model("Gif", gifSchema);

module.exports = Gif;
