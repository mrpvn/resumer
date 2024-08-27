import {model, models, Schema, Types} from "mongoose";

export interface IPersonalDetail extends Document {
  createdBy: Types.ObjectId;
  firstName: string;
  lastName?: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const PersonalDetailSchema: Schema<IPersonalDetail> = new Schema({
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  jobTitle: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {timestamps: true})

const PersonalDetail = models?.PersonalDetail || model('PersonalDetail', PersonalDetailSchema)

export default PersonalDetail;