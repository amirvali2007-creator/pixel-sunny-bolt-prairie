import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked = false,
  onCheckedChange,
  className,
  "aria-label": ariaLabel,
}: {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-ink/30 bg-paper",
        "after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2",
        checked && "border-accent bg-accent text-accent-fg",
        className,
      )}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {checked ? <Check className="size-3" strokeWidth={3} /> : null}
    </button>
  );
}
