import type { Resume } from "../types";

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const { contact, summary, workExperience, education, skills } = resume;

  const hasSummary = summary.trim().length > 0;
  const hasWork = workExperience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasContactLine =
    contact.email || contact.phone || contact.location || contact.linkedin;

  function parseBullets(text: string): string[] {
    return text
      .split("\n")
      .map((l) => l.replace(/^[-\u2022*]\s*/, "").trim())
      .filter(Boolean);
  }

  return (
    <div
      id="resume-preview-root"
      className="resume-preview bg-white text-[#1a1a1a] text-[13px] leading-[1.4] p-8 min-h-full"
      style={{ fontFamily: "'General Sans', Arial, Helvetica, sans-serif" }}
    >
      {/* Header: Name */}
      <div className="mb-1">
        <h1
          className="text-[28px] font-bold tracking-tight leading-none mb-1"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            color: "#111827",
          }}
        >
          {contact.name || <span style={{ color: "#9ca3af" }}>Your Name</span>}
        </h1>

        {hasContactLine && (
          <div
            className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] mt-1"
            style={{ color: "#374151" }}
          >
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && (
              <>
                {contact.email && <span style={{ color: "#9ca3af" }}>|</span>}
                <span>{contact.phone}</span>
              </>
            )}
            {contact.location && (
              <>
                {(contact.email || contact.phone) && (
                  <span style={{ color: "#9ca3af" }}>|</span>
                )}
                <span>{contact.location}</span>
              </>
            )}
            {contact.linkedin && (
              <>
                {(contact.email || contact.phone || contact.location) && (
                  <span style={{ color: "#9ca3af" }}>|</span>
                )}
                <span style={{ color: "#1d4ed8" }}>{contact.linkedin}</span>
              </>
            )}
          </div>
        )}
      </div>

      <hr
        style={{ borderColor: "#374151", borderTopWidth: 2, margin: "10px 0" }}
      />

      {/* Summary */}
      {hasSummary && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#374151" }}
          >
            Professional Summary
          </h2>
          <hr
            style={{
              borderColor: "#d1d5db",
              borderTopWidth: 1,
              marginBottom: 6,
            }}
          />
          <p
            className="text-[12.5px] leading-[1.5]"
            style={{ color: "#1f2937" }}
          >
            {summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {hasWork && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#374151" }}
          >
            Work Experience
          </h2>
          <hr
            style={{
              borderColor: "#d1d5db",
              borderTopWidth: 1,
              marginBottom: 6,
            }}
          />
          <div className="space-y-3">
            {workExperience.map((job) => {
              const bullets = parseBullets(job.description);
              const dateRange = [job.startDate, job.endDate]
                .filter(Boolean)
                .join(" – ");
              const jobKey = `${job.title}-${job.company}-${job.startDate}`;
              return (
                <div key={jobKey}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span
                        className="font-semibold text-[13px]"
                        style={{ color: "#111827" }}
                      >
                        {job.title || "Job Title"}
                      </span>
                      {job.company && (
                        <span
                          className="text-[12.5px]"
                          style={{ color: "#374151" }}
                        >
                          {" · "}
                          {job.company}
                        </span>
                      )}
                      {job.location && (
                        <span
                          className="text-[12px]"
                          style={{ color: "#6b7280" }}
                        >
                          {" · "}
                          {job.location}
                        </span>
                      )}
                    </div>
                    {dateRange && (
                      <span
                        className="text-[11.5px] whitespace-nowrap flex-shrink-0"
                        style={{ color: "#6b7280" }}
                      >
                        {dateRange}
                      </span>
                    )}
                  </div>
                  {bullets.length > 0 && (
                    <ul
                      className="mt-1 ml-4 space-y-0.5"
                      style={{ listStyleType: "disc" }}
                    >
                      {bullets.map((b) => (
                        <li
                          key={b}
                          className="text-[12px]"
                          style={{ color: "#374151" }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Education */}
      {hasEducation && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#374151" }}
          >
            Education
          </h2>
          <hr
            style={{
              borderColor: "#d1d5db",
              borderTopWidth: 1,
              marginBottom: 6,
            }}
          />
          <div className="space-y-2">
            {education.map((edu) => {
              const degree = [edu.degree, edu.field]
                .filter(Boolean)
                .join(" in ");
              const dateRange = [edu.startDate, edu.endDate]
                .filter(Boolean)
                .join(" – ");
              const eduKey = `${edu.institution}-${edu.degree}-${edu.startDate}`;
              return (
                <div
                  key={eduKey}
                  className="flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span
                      className="font-semibold text-[13px]"
                      style={{ color: "#111827" }}
                    >
                      {degree || "Degree / Field"}
                    </span>
                    {edu.institution && (
                      <div className="text-[12px]" style={{ color: "#374151" }}>
                        {edu.institution}
                      </div>
                    )}
                  </div>
                  {dateRange && (
                    <span
                      className="text-[11.5px] whitespace-nowrap flex-shrink-0"
                      style={{ color: "#6b7280" }}
                    >
                      {dateRange}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills */}
      {hasSkills && (
        <section>
          <h2
            className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#374151" }}
          >
            Skills
          </h2>
          <hr
            style={{
              borderColor: "#d1d5db",
              borderTopWidth: 1,
              marginBottom: 6,
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[11.5px] px-2 py-0.5 rounded"
                style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!contact.name &&
        !hasSummary &&
        !hasWork &&
        !hasEducation &&
        !hasSkills && (
          <div
            className="flex items-center justify-center py-16"
            style={{ color: "#9ca3af" }}
          >
            <p className="text-[13px] text-center">
              Start filling in your resume on the left
              <br />
              and it will appear here instantly.
            </p>
          </div>
        )}
    </div>
  );
}
