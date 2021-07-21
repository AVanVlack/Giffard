const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			uniue: true,
			trim: true,
			minlength: 3,
		},
		name: { type: String, required: false },
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		hash: { type: String, required: true },
		salt: { type: String, required: false },
		bio: { type: String, required: false },
		website: { type: String, required: false },
		image: { type: String, required: false },
		saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) {
// 		return next();
// 	}

// 	this.password = await bcrypt.hash(this.password, 12);
// 	this.passwordConfirm = undefined;
// 	next();
// });

// userSchema.methods.comparePassword = async function (
// 	candidatePassword,
// 	hashedPassword
// ) {
// 	return await bcrypt.compare(candidatePassword, hashedPassword);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
