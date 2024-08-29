import { Schema, Types, model, models } from 'mongoose';
import { IPersonalDetail, PersonalDetailSchema } from './personalDetail.model';
import { IIndividualEducationType, IndividualEducationSchema } from './education.model';
import { IIndividualSkillType, IndividualSkillSchema } from './skill.model';
import { ISummary, SummarySchema } from './summary.model';
import { IIndividualExperienceType, IndividualExperienceSchema } from './experience.model';

export interface IResume extends Document {
  createdBy: Types.ObjectId;
  personalDetail: IPersonalDetail;
  summary: ISummary;
  experiences: IIndividualExperienceType[];
  education: IIndividualEducationType[];
  skills: IIndividualSkillType[];
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema<IResume> = new Schema({
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  personalDetail: PersonalDetailSchema,
  summary: SummarySchema,
  experiences: [IndividualExperienceSchema],
  education: [IndividualEducationSchema],
  skills: [IndividualSkillSchema],
}, { timestamps: true });

const Resume = models?.Resume || model('Resume', ResumeSchema);

export default Resume;
