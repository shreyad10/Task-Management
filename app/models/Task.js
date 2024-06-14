const { Schema, model, ObjectId, mongoose, Types } = require("mongoose");

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ["to-do", "in-progress", "done"],
            default: "to-do",
        },
        dueDate: { type: Date, required: true },
        projectId: { type: ObjectId, ref: "Project", required: true },
        owner: { type: ObjectId, ref: "User", required: true },
        priority : {
            type: String,
            required: true,
            enum: ['low', 'medium', 'high'],
            default: "medium",
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model("Task", TaskSchema);
