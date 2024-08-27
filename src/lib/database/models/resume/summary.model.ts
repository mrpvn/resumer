import {model, models, Schema, Types} from "mongoose";

export interface ISummary extends Document {
  createdBy: Types.ObjectId;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SummarySchema: Schema<ISummary> = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  summary: {
    type: String,
    required: true
  }
}, {timestamps: true})

const Summary = models?.Summary || model('Summary', SummarySchema)

export default Summary;