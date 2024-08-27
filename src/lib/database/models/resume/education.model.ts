import { Schema, model, models, Document, Model, Types } from 'mongoose';

export interface IIndividualEducationType {
  createdBy: Types.ObjectId;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
}

export interface IEducatonType extends Document {
  education: IIndividualEducationType[];
  createdAt: Date;
  updatedAt: Date;
}

export const IndividualEducationSchema: Schema<IIndividualEducationType> = new Schema({
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  universityName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const EducationSchema:Schema<IEducatonType> = new Schema({
  education: [IndividualEducationSchema],
}, { timestamps: true });

const Education = models?.Education || model('User', EducationSchema);

export default Education;
