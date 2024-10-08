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
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
      margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
      filename?: string;
      image?: {
          type?: string;
          quality?: number;
      };
      html2canvas?: any; // Define this more specifically if needed
      jsPDF?: any; // Define this more specifically if needed
      pagebreak?: any; // Define this more specifically if needed
      width?: number | string;
      height?: number | string;
      x?: number;
      y?: number;
  }

  interface Html2PdfInstance {
      from(element: HTMLElement | string): Html2PdfInstance;
      toPdf(): Promise<any>;
      save(filename?: string): Promise<void>;
      output(type?: 'datauristring' | 'blob' | 'arraybuffer' | 'pdf'): Promise<any>;
      set(options: Html2PdfOptions): Html2PdfInstance;
      then(callback: (instance: Html2PdfInstance) => void): Html2PdfInstance;
      catch(callback: (error: any) => void): Html2PdfInstance;
  }

  function html2pdf(element: HTMLElement | string, options?: Html2PdfOptions): Html2PdfInstance;

  export = html2pdf;
}


