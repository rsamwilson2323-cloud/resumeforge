import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Education } from "../../types";
import { emptyEducation } from "../../types";

interface Props {
  educations: Education[];
  onChange: (educations: Education[]) => void;
  onBlur: () => void;
}

export function EducationSection({ educations, onChange, onBlur }: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(
    educations.length > 0 ? 0 : null,
  );

  function update(idx: number, field: keyof Education, value: string) {
    const next = educations.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu,
    );
    onChange(next);
  }

  function add() {
    const next = [...educations, emptyEducation()];
    onChange(next);
    setExpandedIdx(next.length - 1);
  }

  function remove(idx: number) {
    const next = educations.filter((_, i) => i !== idx);
    onChange(next);
    setExpandedIdx(next.length > 0 ? Math.min(idx, next.length - 1) : null);
  }

  return (
    <section data-ocid="education.section" className="space-y-0">
      <div className="bg-primary/90 rounded-t-lg px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-primary-foreground uppercase tracking-wider">
          Education
        </h2>
      </div>
      <div className="px-4 pb-4 pt-3 space-y-3">
        {educations.length === 0 && (
          <p
            data-ocid="education.empty_state"
            className="text-sm text-muted-foreground text-center py-4"
          >
            No education entries yet.
          </p>
        )}
        {educations.map((edu, idx) => (
          <div
            key={`${edu.institution}-${edu.degree}-${idx}`}
            data-ocid={`education.item.${idx + 1}`}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors text-left"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {edu.degree
                    ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`
                    : "New Degree"}
                </p>
                {edu.institution && (
                  <p className="text-xs text-muted-foreground truncate">
                    {edu.institution}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(idx);
                  }}
                  data-ocid={`education.delete_button.${idx + 1}`}
                  aria-label="Delete education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                {expandedIdx === idx ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedIdx === idx && (
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                    Institution
                  </Label>
                  <Input
                    data-ocid={`education.institution_input.${idx + 1}`}
                    value={edu.institution}
                    onChange={(e) => update(idx, "institution", e.target.value)}
                    onBlur={onBlur}
                    placeholder="MIT, Stanford University..."
                    className="bg-background border-border h-8 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Degree
                    </Label>
                    <Input
                      data-ocid={`education.degree_input.${idx + 1}`}
                      value={edu.degree}
                      onChange={(e) => update(idx, "degree", e.target.value)}
                      onBlur={onBlur}
                      placeholder="B.S., M.S., Ph.D."
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Field of Study
                    </Label>
                    <Input
                      data-ocid={`education.field_input.${idx + 1}`}
                      value={edu.field}
                      onChange={(e) => update(idx, "field", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Computer Science"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Start Date
                    </Label>
                    <Input
                      data-ocid={`education.start_input.${idx + 1}`}
                      value={edu.startDate}
                      onChange={(e) => update(idx, "startDate", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Sep 2018"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      End Date
                    </Label>
                    <Input
                      data-ocid={`education.end_input.${idx + 1}`}
                      value={edu.endDate}
                      onChange={(e) => update(idx, "endDate", e.target.value)}
                      onBlur={onBlur}
                      placeholder="May 2022"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          data-ocid="education.add_button"
          className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Education
        </Button>
      </div>
    </section>
  );
}
