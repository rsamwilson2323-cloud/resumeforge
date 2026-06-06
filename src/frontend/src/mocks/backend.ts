import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  loadResume: async () => ({
    contact: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 123-4567",
      linkedin: "https://linkedin.com/in/janesmith",
      location: "San Francisco, CA",
    },
    summary:
      "Results-driven software engineer with 7+ years of experience building scalable web applications. Proven track record of delivering high-impact solutions in fast-paced environments. Adept at collaborating across teams and mentoring junior developers.",
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Acme Corp",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description:
          "Led development of microservices architecture serving 1M+ daily users\nReduced API latency by 40% through caching and query optimization\nMentored team of 4 junior engineers and conducted technical interviews",
      },
      {
        title: "Software Engineer",
        company: "TechStart Inc",
        location: "Austin, TX",
        startDate: "Jun 2018",
        endDate: "Dec 2020",
        description:
          "Built RESTful APIs for e-commerce platform processing $5M monthly revenue\nImplemented CI/CD pipelines reducing deployment time by 60%\nDeveloped React frontend components used by 50K+ customers",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science",
        field: "Computer Science",
        institution: "University of California, Berkeley",
        startDate: "Sep 2014",
        endDate: "May 2018",
      },
    ],
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    updatedAt: BigInt(Date.now()),
  }),
  saveResume: async () => undefined,
};
