import { Schema, model, models } from 'mongoose';

export interface IExperience {
  id: string;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string
}

export interface IAcademic {
  id: string;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string
}

export interface ISkill {
  id: string;
  name: string;
  rating: string
}

export interface IResume extends Document {
  title: string;
  resumeId: string;
  userName: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experiences: IExperience[];
  academics: IAcademic[];
  skills: ISkill[];
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
  },
  firstName: {type: String},
  lastName: {type: String},
  jobTitle: {type: String},
  address: {type: String},
  phone: {type: String},
  email: {type: String},
  summary: {type: String},
  experiences: [
    {
      experienceId: {type: String},
      title: {type: String},
      companyName: {type: String},
      city: {type: String},
      state: {type: String},
      startDate: {type: String},
      endDate: {type: String},
      currentlyWorking: {type: Boolean},
      workSummary: {type: String}
    }
  ],
  academics: [
    {
      educationId: {type: String},
      universityName: {type: String},
      startDate: {type: String},
      endDate: {type: String},
      degree: {type: String},
      major: {type: String},
      description: {type: String}
    }
  ],
  skills: [
    {
      id: {type: String},
      name: {type: String},
      rating: {type: String}
    }
  ]
}, { timestamps: true });

const Resume = models?.Resume || model('Resume', ResumeSchema);

export default Resume;
