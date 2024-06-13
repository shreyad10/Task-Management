const { Schema, model, ObjectId, mongoose, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    // first_name: { type: String, required: true },
    // last_name: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User", UserSchema);
