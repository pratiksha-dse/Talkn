const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// name : "", username : "", phone : ""
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },

  email: {
    type: String,
    required: true,
    min: 10,
    max: 13,
  },

   userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);