import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignLeft,
  Briefcase,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Plus,
  Save,
  User,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ResumePreview } from "../components/ResumePreview";
import { SkillsSection } from "../components/editor/SkillsSection";
import { useResume } from "../hooks/useResume";
import type { ContactInfo, Education, WorkExperience } from "../types";
import { emptyEducation, emptyWorkExperience } from "../types";
import { exportToPdf } from "../utils/exportPdf";

// --- Small shared sub-components ---

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          {icon && <span className="opacity-80">{icon}</span>}
          <span className="font-semibold text-sm">{title}</span>
        </div>
        {action && <span>{action}</span>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function EmptySlot({
  label,
  cta,
  onClick,
  ocid,
}: {
  label: string;
  cta: string;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 py-6 text-center"
      data-ocid={ocid}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <button
        type="button"
        className="text-xs text-primary underline-offset-2 hover:underline transition-colors"
        onClick={onClick}
      >
        {cta}
      </button>
    </div>
  );
}
export function EditorPage() {
  const { resume: savedResume, save, isSaving, isLoading } = useResume(true);
  const [resume, setResume] = useState(savedResume);
  const hasLoaded = useRef(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  // Sync from backend once on initial load only
  useEffect(() => {
    if (hasLoaded.current) return;
    if (
      savedResume.contact.name ||
      savedResume.summary ||
      savedResume.workExperience.length > 0 ||
      savedResume.skills.length > 0
    ) {
      hasLoaded.current = true;
      isFirstRender.current = true;
      setResume(savedResume);
    }
  }, [savedResume]);

  // Debounced auto-save: watches resume state, saves 1.5s after last change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      save(resume);
    }, 1500);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [resume, save]);

  function updateContact(field: keyof ContactInfo, value: string) {
    setResume({ ...resume, contact: { ...resume.contact, [field]: value } });
  }

  function updateWork(
    index: number,
    field: keyof WorkExperience,
    value: string,
  ) {
    const updated = resume.workExperience.map((w, i) =>
      i === index ? { ...w, [field]: value } : w,
    );
    setResume({ ...resume, workExperience: updated });
  }

  function addWork() {
    setResume({
      ...resume,
      workExperience: [...resume.workExperience, emptyWorkExperience()],
    });
  }

  function removeWork(index: number) {
    setResume({
      ...resume,
      workExperience: resume.workExperience.filter((_, i) => i !== index),
    });
  }

  function updateEducation(
    index: number,
    field: keyof Education,
    value: string,
  ) {
    const updated = resume.education.map((e, i) =>
      i === index ? { ...e, [field]: value } : e,
    );
    setResume({ ...resume, education: updated });
  }

  function addEducation() {
    setResume({
      ...resume,
      education: [...resume.education, emptyEducation()],
    });
  }

  function removeEducation(index: number) {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  }

  function handleSkillsChange(skills: string[]) {
    setResume({ ...resume, skills });
  }

  return (
    <div
      className="flex flex-col h-screen bg-background overflow-hidden"
      data-ocid="editor.page"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-card border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="font-display font-semibold text-lg text-foreground">
            Resume Editor
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && (
            <span
              className="text-sm text-muted-foreground"
              data-ocid="editor.loading_state"
            >
              Loading...
            </span>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => exportToPdf(resume)}
            data-ocid="editor.export_pdf_button"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => save(resume)}
            disabled={isSaving}
            data-ocid="editor.save_button"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor panel */}
        <div
          className="w-1/2 border-r border-border overflow-y-auto bg-background"
          data-ocid="editor.panel"
        >
          <div className="p-6 space-y-6 max-w-2xl mx-auto">
            {/* Contact Information */}
            <SectionCard
              title="Contact Information"
              icon={<User className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <FormField label="Full Name" htmlFor="contact-name">
                  <Input
                    id="contact-name"
                    value={resume.contact.name}
                    onChange={(e) => updateContact("name", e.target.value)}
                    placeholder="Jane Doe"
                    data-ocid="editor.contact_name.input"
                  />
                </FormField>
                <FormField
                  label="Job Title / Headline"
                  htmlFor="contact-location"
                >
                  <Input
                    id="contact-location"
                    value={resume.contact.location}
                    onChange={(e) => updateContact("location", e.target.value)}
                    placeholder="Software Engineer · San Francisco, CA"
                    data-ocid="editor.contact_location.input"
                  />
                </FormField>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Phone" htmlFor="contact-phone">
                    <Input
                      id="contact-phone"
                      value={resume.contact.phone}
                      onChange={(e) => updateContact("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                      data-ocid="editor.contact_phone.input"
                    />
                  </FormField>
                  <FormField label="Email" htmlFor="contact-email">
                    <Input
                      id="contact-email"
                      value={resume.contact.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                      placeholder="jane@example.com"
                      data-ocid="editor.contact_email.input"
                    />
                  </FormField>
                </div>
                <FormField label="LinkedIn" htmlFor="contact-linkedin">
                  <Input
                    id="contact-linkedin"
                    value={resume.contact.linkedin}
                    onChange={(e) => updateContact("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/janedoe"
                    data-ocid="editor.contact_linkedin.input"
                  />
                </FormField>
              </div>
            </SectionCard>

            {/* Professional Summary */}
            <SectionCard
              title="Professional Summary"
              icon={<AlignLeft className="w-4 h-4" />}
            >
              <Textarea
                value={resume.summary}
                onChange={(e) =>
                  setResume({ ...resume, summary: e.target.value })
                }
                placeholder="A results-driven professional with experience in..."
                rows={4}
                className="resize-none"
                data-ocid="editor.summary.textarea"
              />
              <p className="text-right text-xs text-muted-foreground mt-1">
                {resume.summary.split(/\s+/).filter(Boolean).length} words
              </p>
            </SectionCard>

            {/* Work Experience */}
            <SectionCard
              title="Work Experience"
              icon={<Briefcase className="w-4 h-4" />}
              action={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={addWork}
                  data-ocid="editor.add_work.button"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              }
            >
              {resume.workExperience.length === 0 && (
                <EmptySlot
                  label="No work experience added yet."
                  cta="Add your first job"
                  onClick={addWork}
                  ocid="editor.work.empty_state"
                />
              )}
              <div className="space-y-5">
                {resume.workExperience.map((job, i) => (
                  <div
                    key={`${job.title}-${job.company}-${i}`}
                    className="rounded-lg border border-border p-4 space-y-3 relative"
                    data-ocid={`editor.work.item.${i + 1}`}
                  >
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeWork(i)}
                      aria-label="Remove work experience"
                      data-ocid={`editor.work.delete_button.${i + 1}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Job Title" htmlFor={`work-title-${i}`}>
                        <Input
                          id={`work-title-${i}`}
                          value={job.title}
                          onChange={(e) =>
                            updateWork(i, "title", e.target.value)
                          }
                          placeholder="Senior Engineer"
                          data-ocid={`editor.work.title.${i + 1}`}
                        />
                      </FormField>
                      <FormField label="Company" htmlFor={`work-company-${i}`}>
                        <Input
                          id={`work-company-${i}`}
                          value={job.company}
                          onChange={(e) =>
                            updateWork(i, "company", e.target.value)
                          }
                          placeholder="Acme Corp"
                          data-ocid={`editor.work.company.${i + 1}`}
                        />
                      </FormField>
                    </div>
                    <FormField label="Location" htmlFor={`work-location-${i}`}>
                      <Input
                        id={`work-location-${i}`}
                        value={job.location ?? ""}
                        onChange={(e) =>
                          updateWork(i, "location", e.target.value)
                        }
                        placeholder="San Francisco, CA (or Remote)"
                        data-ocid={`editor.work.location.${i + 1}`}
                      />
                    </FormField>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Start Date" htmlFor={`work-start-${i}`}>
                        <Input
                          id={`work-start-${i}`}
                          value={job.startDate}
                          onChange={(e) =>
                            updateWork(i, "startDate", e.target.value)
                          }
                          placeholder="Jan 2020"
                          data-ocid={`editor.work.start.${i + 1}`}
                        />
                      </FormField>
                      <FormField label="End Date" htmlFor={`work-end-${i}`}>
                        <Input
                          id={`work-end-${i}`}
                          value={job.endDate}
                          onChange={(e) =>
                            updateWork(i, "endDate", e.target.value)
                          }
                          placeholder="Present"
                          data-ocid={`editor.work.end.${i + 1}`}
                        />
                      </FormField>
                    </div>
                    <FormField
                      label="Description (one bullet per line)"
                      htmlFor={`work-desc-${i}`}
                    >
                      <Textarea
                        id={`work-desc-${i}`}
                        value={job.description}
                        onChange={(e) =>
                          updateWork(i, "description", e.target.value)
                        }
                        placeholder="- Led a team of 5 engineers to deliver..."
                        rows={4}
                        className="resize-none"
                        data-ocid={`editor.work.description.${i + 1}`}
                      />
                    </FormField>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard
              title="Education"
              icon={<GraduationCap className="w-4 h-4" />}
              action={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={addEducation}
                  data-ocid="editor.add_education.button"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              }
            >
              {resume.education.length === 0 && (
                <EmptySlot
                  label="No education added yet."
                  cta="Add education"
                  onClick={addEducation}
                  ocid="editor.education.empty_state"
                />
              )}
              <div className="space-y-4">
                {resume.education.map((edu, i) => (
                  <div
                    key={`${edu.institution}-${edu.degree}-${i}`}
                    className="rounded-lg border border-border p-4 space-y-3 relative"
                    data-ocid={`editor.education.item.${i + 1}`}
                  >
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeEducation(i)}
                      aria-label="Remove education"
                      data-ocid={`editor.education.delete_button.${i + 1}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <FormField
                      label="Degree / Major"
                      htmlFor={`edu-degree-${i}`}
                    >
                      <Input
                        id={`edu-degree-${i}`}
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(i, "degree", e.target.value)
                        }
                        placeholder="Bachelor of Science in Computer Science"
                        data-ocid={`editor.education.degree.${i + 1}`}
                      />
                    </FormField>
                    <FormField
                      label="Field of Study"
                      htmlFor={`edu-field-${i}`}
                    >
                      <Input
                        id={`edu-field-${i}`}
                        value={edu.field}
                        onChange={(e) =>
                          updateEducation(i, "field", e.target.value)
                        }
                        placeholder="Computer Science"
                        data-ocid={`editor.education.field.${i + 1}`}
                      />
                    </FormField>
                    <FormField
                      label="Institution"
                      htmlFor={`edu-institution-${i}`}
                    >
                      <Input
                        id={`edu-institution-${i}`}
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(i, "institution", e.target.value)
                        }
                        placeholder="University of California, Berkeley"
                        data-ocid={`editor.education.institution.${i + 1}`}
                      />
                    </FormField>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Start Date" htmlFor={`edu-start-${i}`}>
                        <Input
                          id={`edu-start-${i}`}
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(i, "startDate", e.target.value)
                          }
                          placeholder="Sep 2016"
                          data-ocid={`editor.education.start.${i + 1}`}
                        />
                      </FormField>
                      <FormField label="End Date" htmlFor={`edu-end-${i}`}>
                        <Input
                          id={`edu-end-${i}`}
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(i, "endDate", e.target.value)
                          }
                          placeholder="Jun 2020"
                          data-ocid={`editor.education.end.${i + 1}`}
                        />
                      </FormField>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Skills */}
            <SkillsSection
              skills={resume.skills}
              onChange={handleSkillsChange}
              onBlur={() => save(resume)}
            />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div
          className="w-1/2 bg-muted/40 overflow-y-auto"
          data-ocid="editor.preview_panel"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-2.5 bg-card/80 backdrop-blur border-b border-border">
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Eye className="w-4 h-4 text-primary" />
              Live Preview
            </div>
            <button
              type="button"
              className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
              onClick={() => exportToPdf(resume)}
              data-ocid="editor.preview_export_button"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          </div>
          <div className="p-6">
            <div className="max-w-[680px] mx-auto shadow-lg rounded-sm overflow-hidden border border-border">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
