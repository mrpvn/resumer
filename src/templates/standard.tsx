import React from "react";
import { formatDate } from "date-fns";
import { ResumeWithRelations } from "@/lib/types";

const StandardTemplate = ({
  resumeData,
}: {
  resumeData: ResumeWithRelations;
}) => {
  const {
    personalInfo,
    workExperiences,
    educations,
    projects,
    achievements,
    skills,
  } = resumeData;
  const workExperiencesFieldsNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );
  const educationsFieldsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );
  const projectsFieldsNotEmpty = projects?.filter(
    (project) => Object.values(project).filter(Boolean).length > 0
  );
  const achievementsFieldsNotEmpty = achievements?.achievements
    ?.split("\n")
    .filter((achievement) => achievement.trim() !== "");
  return (
    <div className="font-sans text-black">
      {/* Header */}
      <header className="text-center mb-4 break-inside-avoid">
        <h1 className="text-[20px] font-bold">
          {personalInfo?.firstName} {personalInfo?.lastName}
        </h1>
        <p className="text-[11px] mb-2">
          {personalInfo?.address}{" "}
          {personalInfo?.email && `• ${personalInfo?.email}`}{" "}
          {personalInfo?.phone && `• ${personalInfo?.phone}`}{" "}
          {personalInfo?.linkedin && `• ${personalInfo?.linkedin}`}{" "}
          {personalInfo?.github && `• ${personalInfo?.github}`}{" "}
          {personalInfo?.website && `• ${personalInfo?.website}`}
        </p>
        <p className="text-[11px] text-justify">{personalInfo?.summary}</p>
      </header>

      {/* Education Section */}
      {educationsFieldsNotEmpty && educationsFieldsNotEmpty.length > 0 ? (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b pb-1 mb-2">
            Education
          </h2>
          <div className="mb-2">
            <div>
              {educationsFieldsNotEmpty?.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px]">
                      {edu.institutionName}
                    </span>
                    <span className="text-[11px]">
                      {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                      {edu.endDate
                        ? ` - ${formatDate(edu.endDate, "MMM yyyy")}`
                        : " - Present"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[11px]">{edu.degree}</span>
                    <span className="text-[11px]">
                      {edu.cgpa && `CGPA: ${edu.cgpa}`}
                    </span>
                  </div>
                  <p className="text-[11px]">
                    {edu.subjects && `Relevant coursework: ${edu.subjects}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Professional Experience Section */}
      {workExperiencesFieldsNotEmpty &&
      workExperiencesFieldsNotEmpty.length > 0 ? (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="mb-3">
            {workExperiencesFieldsNotEmpty?.map((exp, index) => {
              const summaries = exp.workSummary && exp.workSummary.split("\n");
              return (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[12px] uppercase">
                      <span>{exp.companyName}</span>
                      {exp.location && ` - ${exp.location}`}
                    </span>
                    <span className="text-[11px]">
                      {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}
                      {exp.endDate
                        ? ` - ${formatDate(exp.endDate, "MMM yyyy")}`
                        : " - Present"}
                    </span>
                  </div>
                  <p className="text-[11px] italic capitalize">
                    {exp.position}
                  </p>
                  <ul className="list-disc pl-5 text-[11px] space-y-1">
                    {summaries &&
                      summaries?.map((summary, index) => (
                        <li key={index}>{summary}</li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Projects Section */}
      {projectsFieldsNotEmpty && projectsFieldsNotEmpty.length > 0 ? (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b pb-1 mb-2">
            Projects
          </h2>

          {projectsFieldsNotEmpty?.map((project, index) => {
            const summaries =
              project.projectSummary && project.projectSummary.split("\n");
            return (
              <div key={index} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px]">
                    {project.projectTitle}
                  </span>
                  <span className="text-[11px]">
                    {project.startDate &&
                      formatDate(project.startDate, "MMM yyyy")}
                    {project.endDate
                      ? ` - ${formatDate(project.endDate, "MMM yyyy")}`
                      : " - Present"}
                  </span>
                </div>
                <ul className="list-disc pl-5 text-[11px] space-y-1">
                  {summaries &&
                    summaries?.map((summary, index) => (
                      <li key={index}>{summary}</li>
                    ))}
                </ul>
              </div>
            );
          })}
        </section>
      ) : null}

      {/* Skills Section */}
      {skills && skills.functionalSkills && skills.technicalSkills && (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b pb-1 mb-2">
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="font-bold">Functional:</span>{" "}
              {skills?.functionalSkills?.join(", ")}
            </div>
            <div>
              <span className="font-bold">Technical:</span>{" "}
              {skills?.technicalSkills?.join(", ")}
            </div>
            {/* <div>
            <span className="font-bold">Frontend Technologies:</span> React.js,
            Vue.js, Tailwind CSS
          </div>
          <div>
            <span className="font-bold">Backend Development:</span> Express.js,
            Django, GraphQL
          </div> */}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievementsFieldsNotEmpty && achievementsFieldsNotEmpty.length > 0 ? (
        <section>
          <h2 className="text-[14px] font-bold uppercase border-b pb-1 mb-2">
            Achievements
          </h2>

          <ul className="list-disc pl-5 text-[11px] space-y-1">
            {achievementsFieldsNotEmpty &&
              achievementsFieldsNotEmpty?.map((achievements, index) => (
                <li key={index}>{achievements}</li>
              ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default StandardTemplate;
