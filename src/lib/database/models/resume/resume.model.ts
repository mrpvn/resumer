import { Schema, model, models } from 'mongoose';
import { IPersonalDetail, PersonalDetailSchema } from './personalDetail.model';
import { IIndividualEducationType, IndividualEducationSchema } from './education.model';
import { IIndividualSkillType, IndividualSkillSchema } from './skill.model';
import { ISummary, SummarySchema } from './summary.model';
import { IIndividualExperienceType, IndividualExperienceSchema } from './experience.model';

export interface IResume extends Document {
  personalDetail: IPersonalDetail;
  summary: ISummary;
  experiences: IIndividualExperienceType[];
  education: IIndividualEducationType[];
  skills: IIndividualSkillType[];
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema<IResume> = new Schema({
  personalDetail: PersonalDetailSchema,
  summary: SummarySchema,
  experiences: [IndividualExperienceSchema],
  education: [IndividualEducationSchema],
  skills: [IndividualSkillSchema],
}, { timestamps: true });

const Resume = models?.Resume || model('Resume', ResumeSchema);

export default Resume;
