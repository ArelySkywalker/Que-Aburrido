import { InferSchemaType, Schema, model } from "mongoose";

const nodeSchema = new Schema(
  {
    activityType: { type: String, required: true },
    participants: { type: Number },
  },
  { timestamps: true }
);

type Activity = InferSchemaType<typeof nodeSchema>;

export default model<Activity>("Activity", nodeSchema);
