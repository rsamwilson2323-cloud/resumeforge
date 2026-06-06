import type { Resume } from "../types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatBullets(text: string): string {
  return text
    .split("\n")
    .map((l) => l.replace(/^[-\u2022*]\s*/, "").trim())
    .filter(Boolean)
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join("");
}

function buildPrintHtml(resume: Resume): string {
  const { contact, summary, workExperience, education, skills } = resume;

  const contactParts = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" | ");

  const workHtml = workExperience
    .map((job) => {
      const dateRange = [job.startDate, job.endDate]
        .filter(Boolean)
        .join(" \u2013 ");
      const bullets = formatBullets(job.description);
      const companyPart = job.company
        ? `<span class="sep"> &middot; </span><span>${escapeHtml(job.company)}</span>`
        : "";
      const locationPart = job.location
        ? `<span class="sep"> &middot; </span><span class="light">${escapeHtml(job.location)}</span>`
        : "";
      const datePart = dateRange
        ? `<span class="date">${escapeHtml(dateRange)}</span>`
        : "";
      return `<div class="job">
        <div class="job-header">
          <div><strong>${escapeHtml(job.title)}</strong>${companyPart}${locationPart}</div>
          ${datePart}
        </div>
        ${bullets ? `<ul>${bullets}</ul>` : ""}
      </div>`;
    })
    .join("");

  const eduHtml = education
    .map((edu) => {
      const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
      const dateRange = [edu.startDate, edu.endDate]
        .filter(Boolean)
        .join(" \u2013 ");
      const instPart = edu.institution
        ? `<div class="inst">${escapeHtml(edu.institution)}</div>`
        : "";
      const datePart = dateRange
        ? `<span class="date">${escapeHtml(dateRange)}</span>`
        : "";
      return `<div class="edu-row">
        <div><strong>${escapeHtml(degree || "Degree / Field")}</strong>${instPart}</div>
        ${datePart}
      </div>`;
    })
    .join("");

  const skillsHtml = skills
    .map((s) => `<span class="skill-badge">${escapeHtml(s)}</span>`)
    .join("");

  const summarySection = summary.trim()
    ? `<section>
          <h2>Professional Summary</h2>
          <hr class="section-divider" />
          <p class="summary-text">${escapeHtml(summary)}</p>
        </section>`
    : "";

  const workSection =
    workExperience.length > 0
      ? `<section>
          <h2>Work Experience</h2>
          <hr class="section-divider" />
          ${workHtml}
        </section>`
      : "";

  const eduSection =
    education.length > 0
      ? `<section>
          <h2>Education</h2>
          <hr class="section-divider" />
          ${eduHtml}
        </section>`
      : "";

  const skillsSection =
    skills.length > 0
      ? `<section>
          <h2>Skills</h2>
          <hr class="section-divider" />
          <div class="skills-wrap">${skillsHtml}</div>
        </section>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(contact.name || "Resume")} \u2013 Resume</title>
<style>
@page { margin: 18mm 20mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; color: #111; line-height: 1.45; background: #fff; }
h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 2px; }
.contact-line { font-size: 9.5pt; color: #444; margin-bottom: 8px; }
.divider { border: none; border-top: 1.5px solid #333; margin: 8px 0; }
.section-divider { border: none; border-top: 0.75px solid #ccc; margin: 4px 0 7px; }
h2 { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #555; margin-bottom: 3px; }
section { margin-bottom: 14px; }
.summary-text { font-size: 10.5pt; line-height: 1.55; color: #222; }
.job { margin-bottom: 10px; }
.job-header, .edu-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.job-header strong, .edu-row strong { font-size: 10.5pt; color: #111; }
.sep { color: #888; }
.light { color: #666; font-size: 9.5pt; }
.date { font-size: 9pt; color: #666; white-space: nowrap; flex-shrink: 0; }
.inst { font-size: 9.5pt; color: #444; margin-top: 1px; }
ul { margin: 4px 0 0 18px; padding: 0; }
li { font-size: 10pt; color: #333; margin-bottom: 2px; }
.skills-wrap { display: flex; flex-wrap: wrap; gap: 5px; }
.skill-badge { font-size: 9.5pt; color: #333; background: #f3f4f6; border: 1px solid #e5e7eb; padding: 1px 7px; border-radius: 3px; }
</style>
</head>
<body>
<h1>${escapeHtml(contact.name || "Your Name")}</h1>
${contactParts ? `<div class="contact-line">${contactParts}</div>` : ""}
<hr class="divider" />
${summarySection}${workSection}${eduSection}${skillsSection}
<script>window.addEventListener('load', function() { window.print(); });<\/script>
</body>
</html>`;
}

export function exportToPdf(resume: Resume): void {
  const html = buildPrintHtml(resume);
  const win = window.open("", "_blank");
  if (!win) {
    // Fallback: hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position:fixed;width:0;height:0;border:0;left:-9999px;top:-9999px";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 2000);
      }, 500);
    }
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
