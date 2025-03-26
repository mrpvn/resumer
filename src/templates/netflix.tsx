"use client";

import { ResumeWithRelations } from "@/lib/types";
import {
  Play,
  Plus,
  Bookmark,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const NetflixTemplate = ({
  resumeData,
}: {
  resumeData: ResumeWithRelations;
}) => {
  return (
    <div className="bg-[#1C1C1C] text-white min-h-screen p-10">
      {/* Header Section */}
      <header className="border-b border-gray-700 pb-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="text-red-500" size={18} />
              <span>Dallas, Texas</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-red-500" size={18} />
              <span>abc@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-red-500" size={18} />
              <span>+1-464-231-5588</span>
            </div>
          </div>

          <div className="flex gap-4 text-gray-400">
            <Linkedin className="text-red-500" size={20} />
            <Github className="text-red-500" size={20} />
            <Globe className="text-red-500" size={20} />
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-5xl font-bold text-red-500">ADITYA SHARMA</h1>
          <p className="text-gray-400 mt-2">
            Innovative and proactive Product Manager offering five years of
            experience building products in finance and energy industries.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-2">
              <Play size={18} /> Play
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition flex items-center gap-2">
              <Plus size={18} /> More Info
            </button>
          </div>
        </div>
      </header>

      {/* Education Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">EDUCATION</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold">
              Master of Science in Information Technology Management
            </h3>
            <p className="text-gray-400">University of Texas at Dallas</p>
            <p className="text-gray-400">Richardson, TX • Dec-2009</p>
          </div>
          <div>
            <h3 className="font-bold">
              Master of Science in Information Technology Management
            </h3>
            <p className="text-gray-400">University of Texas at Dallas</p>
            <p className="text-gray-400">Richardson, TX • Dec-2009</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">SKILLS</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold">Functional Skills</h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>JIRA</li>
              <li>Confluence</li>
              <li>Agile/Hybrid Methodology</li>
              <li>SDLC</li>
              <li>Test Link</li>
              <li>Mantis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Technical Skills</h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>SQL</li>
              <li>MySQL</li>
              <li>Python</li>
              <li>Java</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          WORK EXPERIENCE
        </h2>

        {/* Tesla */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">TESLA</h3>
              <p className="text-gray-400">
                Technical Project Management • Aug 2019 - Apr 2020
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Play size={18} className="text-white" />
              </button>
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Plus size={18} className="text-white" />
              </button>
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Bookmark size={18} className="text-white" />
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>
              Defined and delivered a product vision for digital transformation.
            </li>
            <li>Created automation solutions saving $500K.</li>
            <li>Organized agile and scrum meetings.</li>
          </ul>
        </div>

        {/* Capgemini */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">CAPGEMINI</h3>
              <p className="text-gray-400">
                Product Manager • Dec 2013 - Feb 2017
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Play size={18} className="text-white" />
              </button>
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Plus size={18} className="text-white" />
              </button>
              <button className="bg-gray-700 p-2 rounded-md hover:bg-red-500 transition">
                <Bookmark size={18} className="text-white" />
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>Led product ideation to launch serving 30M users.</li>
            <li>Established KPIs and OKRs.</li>
            <li>Performed A/B tests to optimize UX.</li>
          </ul>
        </div>
      </section>

      {/* Academic Projects */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          ACADEMIC PROJECTS
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold">
            Prediction of Factors Influencing Wine Quality
          </h3>
          <p className="text-gray-400">
            - Used machine learning techniques, decision trees & regression.
            <br />- Built multiple regression models.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NetflixTemplate;
