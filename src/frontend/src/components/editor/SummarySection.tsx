import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  summary: string;
  onChange: (summary: string) => void;
  onBlur: () => void;
}

export function SummarySection({ summary, onChange, onBlur }: Props) {
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <section data-ocid="summary.section" className="space-y-0">
      <div className="bg-primary/90 rounded-t-lg px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-primary-foreground uppercase tracking-wider">
          Professional Summary
        </h2>
      </div>
      <div className="px-4 pb-4 pt-4 space-y-1.5">
        <Label
          htmlFor="summary-text"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Summary
        </Label>
        <Textarea
          id="summary-text"
          data-ocid="summary.textarea"
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Results-driven professional with 5+ years of experience..."
          className="min-h-[120px] resize-y bg-background border-border leading-relaxed"
        />
        <p className="text-xs text-muted-foreground text-right">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </p>
      </div>
    </section>
  );
}
