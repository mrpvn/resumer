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