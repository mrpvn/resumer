import { Schema, model, models } from 'mongoose';


export interface IResume extends Document {
  title: string;
  resumeId: string;
  userName: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema<IResume> = new Schema({
  title: {
    type: String,
    required: true
  },
  resumeId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Resume = models?.Resume || model('Resume', ResumeSchema);

export default Resume;
