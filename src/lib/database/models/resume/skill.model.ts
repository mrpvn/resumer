import { Schema, Types, model, models } from 'mongoose';

export interface IIndividualSkillType {
  createdBy: Types.ObjectId;
  name: string;
  rating: number;
}

export interface ISkillType extends Document {
  skills: IIndividualSkillType[];
  createdAt: Date;
  updatedAt: Date;
}

export const IndividualSkillSchema: Schema<IIndividualSkillType> = new Schema({
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

export const SkillSchema: Schema<ISkillType> = new Schema({
  skills: [IndividualSkillSchema],
}, { timestamps: true });

const Skill = models?.Skill || model('Skill', SkillSchema);

export default Skill;
