import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
  onBlur: () => void;
}

export function SkillsSection({ skills, onChange, onBlur }: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addSkill() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) {
      setInput("");
      return;
    }
    onChange([...skills, trimmed]);
    setInput("");
    onBlur();
  }

  function removeSkill(skill: string) {
    onChange(skills.filter((s) => s !== skill));
    onBlur();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <section data-ocid="skills.section" className="space-y-0">
      <div className="bg-primary/90 rounded-t-lg px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-primary-foreground uppercase tracking-wider">
          Skills
        </h2>
      </div>
      <div className="px-4 pb-4 pt-4 space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Add a Skill
          </Label>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              data-ocid="skills.input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. TypeScript, Project Management..."
              className="flex-1 bg-background border-border h-9 text-sm"
            />
            <Button
              type="button"
              size="sm"
              onClick={addSkill}
              data-ocid="skills.add_button"
              disabled={!input.trim()}
              className="shrink-0 h-9 px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {skills.length > 0 ? (
          <div data-ocid="skills.list" className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <Badge
                key={skill}
                data-ocid={`skills.item.${idx + 1}`}
                variant="secondary"
                className="gap-1.5 pl-2.5 pr-1.5 py-1 text-xs font-medium cursor-default hover:bg-secondary/80"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  data-ocid={`skills.delete_button.${idx + 1}`}
                  aria-label={`Remove ${skill}`}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p
            data-ocid="skills.empty_state"
            className="text-sm text-muted-foreground text-center py-2"
          >
            No skills added yet. Type a skill above and press Enter.
          </p>
        )}
      </div>
    </section>
  );
}
