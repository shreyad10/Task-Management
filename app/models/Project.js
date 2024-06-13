const { Schema, model, ObjectId, mongoose, Types } = require("mongoose");

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: ObjectId, ref: "User", required : true },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Project", ProjectSchema);
