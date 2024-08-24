import React, { createContext, useContext, ReactNode, useState} from 'react';
import dummyData from '@/data/dummyData';

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [activeFormIndex, setActiveFormIndex] = useState<number>(1);
  const [formPreview, setFormPreview] = useState<FormPreviewType>(dummyData)
  return(
    <ResumeContext.Provider value={{activeFormIndex, setActiveFormIndex, formPreview, setFormPreview}}>
      {children}
    </ResumeContext.Provider>
  )
} 

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeContextProvider');
  }
  return context;
};

