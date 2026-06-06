import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { WorkExperience } from "../../types";
import { emptyWorkExperience } from "../../types";

interface Props {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
  onBlur: () => void;
}

export function WorkExperienceSection({
  experiences,
  onChange,
  onBlur,
}: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(
    experiences.length > 0 ? 0 : null,
  );

  function update(idx: number, field: keyof WorkExperience, value: string) {
    const next = experiences.map((exp, i) =>
      i === idx ? { ...exp, [field]: value } : exp,
    );
    onChange(next);
  }

  function add() {
    const next = [...experiences, emptyWorkExperience()];
    onChange(next);
    setExpandedIdx(next.length - 1);
  }

  function remove(idx: number) {
    const next = experiences.filter((_, i) => i !== idx);
    onChange(next);
    setExpandedIdx(next.length > 0 ? Math.min(idx, next.length - 1) : null);
  }

  return (
    <section data-ocid="work.section" className="space-y-0">
      <div className="bg-primary/90 rounded-t-lg px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-primary-foreground uppercase tracking-wider">
          Work Experience
        </h2>
      </div>
      <div className="px-4 pb-4 pt-3 space-y-3">
        {experiences.length === 0 && (
          <p
            data-ocid="work.empty_state"
            className="text-sm text-muted-foreground text-center py-4"
          >
            No work experience added yet.
          </p>
        )}
        {experiences.map((exp, idx) => (
          <div
            key={`${exp.title}-${exp.company}-${idx}`}
            data-ocid={`work.item.${idx + 1}`}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors text-left"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {exp.title || "New Position"}
                </p>
                {exp.company && (
                  <p className="text-xs text-muted-foreground truncate">
                    {exp.company}
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
                  data-ocid={`work.delete_button.${idx + 1}`}
                  aria-label="Delete experience"
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Job Title
                    </Label>
                    <Input
                      data-ocid={`work.title_input.${idx + 1}`}
                      value={exp.title}
                      onChange={(e) => update(idx, "title", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Senior Engineer"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Company
                    </Label>
                    <Input
                      data-ocid={`work.company_input.${idx + 1}`}
                      value={exp.company}
                      onChange={(e) => update(idx, "company", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Acme Corp"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Start Date
                    </Label>
                    <Input
                      data-ocid={`work.start_input.${idx + 1}`}
                      value={exp.startDate}
                      onChange={(e) => update(idx, "startDate", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Jan 2021"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                      End Date
                    </Label>
                    <Input
                      data-ocid={`work.end_input.${idx + 1}`}
                      value={exp.endDate}
                      onChange={(e) => update(idx, "endDate", e.target.value)}
                      onBlur={onBlur}
                      placeholder="Present"
                      className="bg-background border-border h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                    Description
                  </Label>
                  <Textarea
                    data-ocid={`work.description_input.${idx + 1}`}
                    value={exp.description}
                    onChange={(e) => update(idx, "description", e.target.value)}
                    onBlur={onBlur}
                    placeholder="• Led cross-functional team of 6 engineers...&#10;• Reduced deployment time by 40%..."
                    className="min-h-[100px] resize-y bg-background border-border text-sm"
                  />
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
          data-ocid="work.add_button"
          className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Experience
        </Button>
      </div>
    </section>
  );
}
