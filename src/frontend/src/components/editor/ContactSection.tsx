import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ContactInfo } from "../../types";

interface Props {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
  onBlur: () => void;
}

export function ContactSection({ contact, onChange, onBlur }: Props) {
  const { register, watch, reset } = useForm<ContactInfo>({
    defaultValues: contact,
  });

  // Sync external resume state into form when it loads
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally trigger only when contact.name changes (initial load)
  useEffect(() => {
    reset(contact);
  }, [contact.name, reset]); // only reset on first real load

  const values = watch();

  // Propagate form value changes up
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally listing specific fields to avoid infinite loop
  useEffect(() => {
    onChange(values);
  }, [
    values.name,
    values.email,
    values.phone,
    values.location,
    values.linkedin,
  ]);

  return (
    <section data-ocid="contact.section" className="space-y-4">
      <div className="bg-primary/90 rounded-t-lg px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-primary-foreground uppercase tracking-wider">
          Contact Information
        </h2>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label
              htmlFor="contact-name"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Full Name
            </Label>
            <Input
              id="contact-name"
              data-ocid="contact.name_input"
              placeholder="Jane Smith"
              {...register("name")}
              onBlur={onBlur}
              className="bg-background border-border focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="contact-phone"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Phone
            </Label>
            <Input
              id="contact-phone"
              data-ocid="contact.phone_input"
              placeholder="(555) 123-4567"
              {...register("phone")}
              onBlur={onBlur}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="contact-email"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Email
            </Label>
            <Input
              id="contact-email"
              data-ocid="contact.email_input"
              placeholder="jane@example.com"
              type="email"
              {...register("email")}
              onBlur={onBlur}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="contact-location"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Location
            </Label>
            <Input
              id="contact-location"
              data-ocid="contact.location_input"
              placeholder="San Francisco, CA"
              {...register("location")}
              onBlur={onBlur}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="contact-linkedin"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              LinkedIn
            </Label>
            <Input
              id="contact-linkedin"
              data-ocid="contact.linkedin_input"
              placeholder="linkedin.com/in/janesmith"
              {...register("linkedin")}
              onBlur={onBlur}
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
