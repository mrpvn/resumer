type PersonalDetailProps = {
  personalDetail: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: number;
    email: string;
    themeColor: string;
  };
};

type SummaryProps = {
  summary: {
    summary: string
  }
}

type ExperienceProps = {
  experience:
    {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummary: string;
  }[]
};

type EducationProps = {
  education: {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }[]
};

type SkillProps = {
  skills:{
    id: number;
    name: string;
    rating: number;
  }[]
};

// ----------------------------------RESUME CONTEXT TYPES

interface PersonalDetail {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: number;
  email: string;
  themeColor: string;
}

interface Summary {
  summary: string;
}

interface Experience {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string;
}

interface Education {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
}

interface Skill {
  id: number;
  name: string;
  rating: number;
}

interface FormPreviewType {
  personalDetail: PersonalDetail;
  summary: Summary;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

interface ResumeContextType {
  activeFormIndex: number;
  setActiveFormIndex: Dispatch<SetStateAction<number>>;
  formPreview: FormPreviewType;
  setFormPreview: Dispatch<SetStateAction<FormPreviewType>>;
}

// ====================================USER TYPES

interface UserType {
  clerkId: string;
  email: string;
  firstName: string | null; 
  lastName: string | null;
  photo: string
}

