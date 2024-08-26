import { Schema, model, models, Types } from 'mongoose';

export interface IIndividualExperienceType {
  createdBy: Types.ObjectId;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  workSummary: string;
}

export interface IExperienceType extends Document {
  experiences: IIndividualExperienceType[];
  createdAt: Date;
  updatedAt: Date;
}

export const IndividualExperienceSchema: Schema<IIndividualExperienceType> = new Schema({
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "PersonalDetail",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: ''
  },
  currentlyWorking: {
    type: Boolean,
    required: true
  },
  workSummary: {
    type: String,
    required: true
  }
});

export const ExperienceSchema: Schema<IExperienceType> = new Schema({
  experiences: [IndividualExperienceSchema],
}, { timestamps: true });

const Experience = models?.Experience || model('Experience', ExperienceSchema);

export default Experience;
