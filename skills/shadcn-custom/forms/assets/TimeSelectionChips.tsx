import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimeOption {
  label: string;
  value: string; // HH:mm format
}

interface Props {
  selectedTime: string | null;
  onSelect: (time: string | null) => void;
}

const MINUTES_OPTIONS: TimeOption[] = [
  { label: "5 min", value: "00:05" },
  { label: "10 min", value: "00:10" },
  { label: "15 min", value: "00:15" },
  { label: "20 min", value: "00:20" },
  { label: "30 min", value: "00:30" },
  { label: "40 min", value: "00:40" },
  { label: "45 min", value: "00:45" },
  { label: "50 min", value: "00:50" },
];

const HOURS_OPTIONS: TimeOption[] = [
  { label: "1 hr", value: "01:00" },
  { label: "1 hr 15 min", value: "01:15" },
  { label: "1 hr 30 min", value: "01:30" },
  { label: "1 hr 45 min", value: "01:45" },
  { label: "2 hr", value: "02:00" },
  { label: "2 hr 30 min", value: "02:30" },
  { label: "3 hr", value: "03:00" },
  { label: "3 hr 30 min", value: "03:30" },
  { label: "4 hr", value: "04:00" },
  { label: "4 hr 30 min", value: "04:30" },
  { label: "5 hr", value: "05:00" },
  { label: "5 hr 30 min", value: "05:30" },
  { label: "6 hr", value: "06:00" },
  { label: "6 hr 30 min", value: "06:30" },
  { label: "7 hr", value: "07:00" },
  { label: "7 hr 30 min", value: "07:30" },
  { label: "8 hr", value: "08:00" },
  { label: "8 hr 30 min", value: "08:30" },
  { label: "9 hr", value: "09:00" },
  { label: "9 hr 30 min", value: "09:30" },
  { label: "10 hr", value: "10:00" },
  // { label: "12 hr", value: "12:00" },
];

export const TimeSelectionChips = ({ selectedTime, onSelect }: Props) => {
  const allOptions = [...MINUTES_OPTIONS, ...HOURS_OPTIONS];

  return (
    <div className="flex flex-wrap gap-2">
      {allOptions.map((opt) => {
        const isSelected = selectedTime === opt.value;
        return (
          <Badge
            key={opt.value}
            variant={isSelected ? "default" : "secondary"}
            className={cn(
              "cursor-pointer transition-all text-xs font-normal py-1 px-2.5",
              isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent hover:border-gray-300",
            )}
            onClick={() => onSelect(isSelected ? null : opt.value)}
          >
            {opt.label}
          </Badge>
        );
      })}
    </div>
  );
};
