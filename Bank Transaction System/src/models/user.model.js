const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating an Account"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
      unique: [true, "Email already exists"],
    },
    name: {
      type: String,
      required: [true, "Name is require for creating an Account"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an Account"],
      minlength: [6, "password should contain more than 6 chars. length"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
