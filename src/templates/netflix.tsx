"use client";

import { ResumeWithRelations } from "@/lib/types";
import { formatDate } from "date-fns";
import {
  Play,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Send,
  Phone,
  Globe,
} from "lucide-react";
import Image from "next/image";

const NetflixTemplate = ({
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
    <div className="bg-[#232323] text-white p-5">
      {/* Header Section */}
      <header className="mb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="mr-2">
              <Image
                src="/netflix-logo.png"
                alt="netflix-logo"
                width={60}
                height={80}
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs tracking-wider">
                {personalInfo?.address && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-red-500" />
                    <span>{personalInfo?.address}</span>
                  </div>
                )}
                {personalInfo?.email && (
                  <div className="flex items-center gap-1">
                    <Send size={16} className="text-red-500" />
                    <span>{personalInfo?.email}</span>
                  </div>
                )}
                {personalInfo?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={16} className="text-red-500" />
                    <span>{personalInfo?.phone}</span>
                  </div>
                )}
                {personalInfo?.github && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 mr-1 text-[#E50914]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{personalInfo?.github}</span>
                  </div>
                )}
                {personalInfo?.website && (
                  <div className="flex items-center gap-1">
                    <Globe size={16} className="text-red-500" />
                    <span>{personalInfo?.website}</span>
                  </div>
                )}
                {personalInfo?.linkedin && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 mr-1 text-[#E50914]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-1-.02-2.278-1.39-2.278-1.39 0-1.601 1.084-1.601 2.205v4.25H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{personalInfo?.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          {personalInfo?.firstName && personalInfo?.lastName && (
            <div className="bg-[#414141] p-3 flex flex-col justify-between w-[750px]">
              <p className="text-red-500 text-2xl font-bold uppercase">
                {personalInfo?.firstName} {personalInfo?.lastName}
              </p>
              <Image
                src="/play-more-btn.png"
                alt="play-more-btn"
                width={150}
                height={150}
              />
            </div>
          )}
          {personalInfo?.summary && (
            <div>
              <div className="flex items-center rounded text-xs space-x-2">
                <Image
                  src="/top-ten.png"
                  alt="top-ten"
                  width={20}
                  height={20}
                />
                <span className="font-bold">#1 in Applicants Today</span>
              </div>
              <p className="mt-2 text-xs">{personalInfo?.summary}</p>
            </div>
          )}
        </div>
      </header>

      {/* Education and Skills */}
      <div className="flex gap-2 mb-2">
        {/* Education Section */}
        {educationsFieldsNotEmpty && educationsFieldsNotEmpty.length > 0 ? (
          <section className="flex-1 flex flex-col">
            <h2 className="text-base font-bold text-red-500 mb-2">EDUCATION</h2>
            <div
              className={`grid grid-cols-${educationsFieldsNotEmpty?.length} gap-2 flex-1`}
            >
              {educationsFieldsNotEmpty?.map((edu, index) => (
                <div key={index} className="bg-[#414141] p-2 relative">
                  <h3 className="text-xs">{edu.degree}</h3>
                  <p className="text-xs">{edu.institutionName}</p>
                  <p className="text-[#B6B6B6] text-xs flex gap-1 items-center">
                    {edu.location && <span className="text-xl">•</span>}
                    {edu.location}
                  </p>
                  <div className="flex gap-1 items-center mb-1">
                    {edu.startDate && (
                      <span className="border-white text-nowrap border text-[10px] p-1">
                        {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                        {edu.endDate
                          ? ` - ${formatDate(edu.endDate, "MMM yyyy")}`
                          : " - Present"}
                      </span>
                    )}
                    {edu.cgpa && (
                      <span className="text-[10px] border p-1 border-white text-nowrap">
                        {edu.cgpa}
                      </span>
                    )}
                  </div>
                  {edu.subjects && (
                    <div className="border text-[10px] p-1 border-white">
                      {edu.subjects}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Skills Section */}
        {skills &&
          (skills?.functionalSkills?.length > 0 ||
            skills?.technicalSkills?.length > 0) && (
            <section className="flex-1 flex flex-col">
              <h2 className="text-base font-bold text-red-500 mb-2">SKILLS</h2>
              <div
                className={`grid ${
                  skills?.functionalSkills?.length === 0 ||
                  skills?.technicalSkills?.length === 0
                    ? "grid-cols-1"
                    : "grid-cols-2"
                } gap-2 flex-1`}
              >
                {skills?.functionalSkills?.length > 0 && (
                  <div className="bg-[#414141] p-2 relative">
                    <h3 className="font-bold text-xs">Functional Skills</h3>
                    <ul className="list-disc list-inside text-xs space-y-0">
                      {skills?.functionalSkills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                    <div className="border-[#888888] border p-1 rounded-full absolute bottom-2 right-2">
                      <Plus size={18} className="text-white" />
                    </div>
                  </div>
                )}
                {skills?.technicalSkills?.length > 0 && (
                  <div className="bg-[#414141] p-2 relative">
                    <h3 className="font-bold text-xs">Technical Skills</h3>
                    <ul className="list-disc list-inside text-xs">
                      {skills?.technicalSkills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                    <div className="border-[#888888] border p-1 rounded-full absolute bottom-2 right-2">
                      <Plus size={18} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
      </div>

      {/* Work Experience Section */}
      {workExperiencesFieldsNotEmpty &&
      workExperiencesFieldsNotEmpty.length > 0 ? (
        <section>
          <p className="mb-2 text-[#B8B8B8]">
            Explore titles related to:
            <span className="font-bold text-white"> Work Experience</span>
          </p>
          {/* Tesla */}
          {workExperiencesFieldsNotEmpty.map((exp, index) => {
            const summaries = exp.workSummary && exp.workSummary.split("\n");
            return (
              <div
                key={index}
                className="p-2 border shadow-[#434446] shadow-inner mb-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs">
                    <p className="text-base font-bold">{exp.companyName}</p>
                    <span className="w-[150px] h-[1px] bg-red-500"></span>
                    <p className="text-xs">
                      {" "}
                      {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}
                      {exp.endDate
                        ? ` - ${formatDate(exp.endDate, "MMM yyyy")}`
                        : " - Present"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 m-1">
                    <div className="rounded-full p-1 bg-white">
                      <Play className="fill-black" />
                    </div>
                    <div className="bg-[#323232] border border-[#919191] rounded-full p-2">
                      <Plus size={16} />
                    </div>
                    <div className="bg-[#323232] border border-[#919191] rounded-full p-2">
                      <ThumbsUp size={16} />
                    </div>
                    <div className="bg-[#323232] border border-[#919191] rounded-full p-2">
                      <ThumbsDown size={16} />
                    </div>
                  </div>
                </div>
                <div className="flex text-xs gap-2 mb-2">
                  {exp?.position && (
                    <div className="p-1 border border-white">
                      {exp?.position}
                    </div>
                  )}
                  {exp?.location && (
                    <div className="p-1 border border-white">
                      {exp?.location}
                    </div>
                  )}
                </div>
                {exp?.workSummary && (
                  <ul className="list-disc list-inside text-xs text-white space-y-1">
                    {summaries &&
                      summaries?.map((summary, index) => (
                        <li key={index}>{summary}</li>
                      ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      ) : null}

      {/* Academic Projects and Achievments */}
      <div className="flex gap-2">
        {/* Academic Projects */}
        {projectsFieldsNotEmpty && projectsFieldsNotEmpty.length > 0 ? (
          <section className="mt-2 bg-[#414141] py-1 px-2 flex-1">
            <h2 className="text-base font-bold text-red-500">
              Academic Projects
            </h2>
            {projectsFieldsNotEmpty?.map((project, index) => {
              const summaries =
                project.projectSummary && project.projectSummary.split("\n");
              return (
                <div className="mb-2" key={index}>
                  <p className="font-bold flex justify-between text-xs">
                    {project.projectTitle ? `• ${project?.projectTitle}` : ""}
                    <span>
                      {" "}
                      {project.startDate &&
                        formatDate(project.startDate, "MMM yyyy")}
                      {project.endDate
                        ? ` - ${formatDate(project.endDate, "MMM yyyy")}`
                        : " - Present"}
                    </span>
                  </p>
                  <ul className="text-xs ml-2">
                    {summaries &&
                      summaries?.map((summary, index) => (
                        <li key={index}>{`- ${summary}`}</li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </section>
        ) : null}

        {/* Achievment */}
        {achievementsFieldsNotEmpty && achievementsFieldsNotEmpty.length > 0 ? (
          <section className="mt-2 bg-[#414141] py-1 px-2 flex-1">
            <h2 className="text-base font-bold text-red-500">Achievments</h2>
            <ul className="text-xs list-disc list-inside">
              {achievementsFieldsNotEmpty &&
                achievementsFieldsNotEmpty?.map((achievements, index) => (
                  <li key={index}>{achievements}</li>
                ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default NetflixTemplate;
