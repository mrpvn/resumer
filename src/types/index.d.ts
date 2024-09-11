type PersonalDetailProps = {
  personalDetail: {
    firstName: string;
    lastName?: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
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
    id: string;
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

type AcademicsProps = {
  academics: {
    id: string;
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
    id: string;
    name: string;
    rating: string;
  }[]
};

// ----------------------------------RESUME CONTEXT TYPES

interface PersonalDetail {
  firstName: string;
  lastName?: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
}

interface Summary {
  summary: string;
}

interface Experience {
  id: string;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string;
}

interface Academics {
  id: string;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  rating: string;
}

interface FormPreviewType {
  personalDetail: PersonalDetail;
  summary: Summary;
  experience: Experience[];
  academics: Academics[];
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

// =============================================

interface CreateNewResumeType {
  title: string;
  resumeId: string;
  userName: string;
  userEmail: string;

}

