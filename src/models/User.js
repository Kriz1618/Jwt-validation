const { Schema, model } = require("mongoose");
const bcript = require("bcryptjs");

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.methods.encriptPassword = async (password) => {
  const salt = await bcript.genSalt(10);
  return bcript.hash(password, salt);  
};

userSchema.methods.validatePass = function (password) {
  return bcript.compare(password, this.password);
}

module.exports = model("User", userSchema);
