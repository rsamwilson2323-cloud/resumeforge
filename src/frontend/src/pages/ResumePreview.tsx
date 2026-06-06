import type { Resume } from "../types";

interface Props {
  resume: Resume;
}

export function ResumePreview({ resume }: Props) {
  const { contact, summary, workExperience, education, skills } = resume;

  return (
    <div
      data-ocid="preview.panel"
      className="bg-card border border-border rounded-lg shadow-sm overflow-auto h-full"
    >
      {/* ATS-optimized preview — clean black-and-white layout */}
      <div
        className="bg-white text-foreground font-body p-8 min-h-full"
        style={{ fontFamily: "'General Sans', sans-serif", color: "#1a1a1a" }}
      >
        {/* Header */}
        {contact.name && (
          <div
            className="mb-4 border-b-2 pb-3"
            style={{ borderColor: "#1a1a1a" }}
          >
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#1a1a1a" }}
            >
              {contact.name}
            </h1>
            <div
              className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs"
              style={{ color: "#444" }}
            >
              {contact.email && <span>{contact.email}</span>}
              {contact.phone && <span>{contact.phone}</span>}
              {contact.location && <span>{contact.location}</span>}
              {contact.linkedin && <span>{contact.linkedin}</span>}
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="mb-4">
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1a1a1a" }}
            >
              Professional Summary
            </h2>
            <div className="h-px mb-2" style={{ backgroundColor: "#bbb" }} />
            <p className="text-xs leading-relaxed" style={{ color: "#333" }}>
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1a1a1a" }}
            >
              Work Experience
            </h2>
            <div className="h-px mb-2" style={{ backgroundColor: "#bbb" }} />
            <div className="space-y-3">
              {workExperience.map((exp) => (
                <div key={`${exp.title}-${exp.company}-${exp.startDate}`}>
                  <div className="flex justify-between items-baseline">
                    <p
                      className="text-xs font-bold"
                      style={{ color: "#1a1a1a" }}
                    >
                      {exp.title}
                    </p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs" style={{ color: "#666" }}>
                        {exp.startDate}
                        {exp.startDate && exp.endDate ? " – " : ""}
                        {exp.endDate}
                      </p>
                    )}
                  </div>
                  {exp.company && (
                    <p className="text-xs italic" style={{ color: "#555" }}>
                      {exp.company}
                    </p>
                  )}
                  {exp.description && (
                    <p
                      className="text-xs mt-1 leading-relaxed whitespace-pre-line"
                      style={{ color: "#333" }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1a1a1a" }}
            >
              Education
            </h2>
            <div className="h-px mb-2" style={{ backgroundColor: "#bbb" }} />
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={`${edu.institution}-${edu.degree}-${edu.startDate}`}>
                  <div className="flex justify-between items-baseline">
                    <p
                      className="text-xs font-bold"
                      style={{ color: "#1a1a1a" }}
                    >
                      {edu.degree}
                      {edu.degree && edu.field ? " in " : ""}
                      {edu.field}
                    </p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs" style={{ color: "#666" }}>
                        {edu.startDate}
                        {edu.startDate && edu.endDate ? " – " : ""}
                        {edu.endDate}
                      </p>
                    )}
                  </div>
                  {edu.institution && (
                    <p className="text-xs" style={{ color: "#555" }}>
                      {edu.institution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1a1a1a" }}
            >
              Skills
            </h2>
            <div className="h-px mb-2" style={{ backgroundColor: "#bbb" }} />
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 border rounded"
                  style={{ borderColor: "#999", color: "#333" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!contact.name &&
          !summary &&
          workExperience.length === 0 &&
          education.length === 0 &&
          skills.length === 0 && (
            <div
              data-ocid="preview.empty_state"
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <p className="text-sm" style={{ color: "#aaa" }}>
                Fill in your details on the left to see your ATS-ready resume
                here.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
