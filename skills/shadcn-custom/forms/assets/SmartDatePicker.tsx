import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React from "react";

interface SmartDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  fromYear?: number;
  toYear?: number;
  placeholder?: string;
  className?: string;
}

export function SmartDatePicker({
  value,
  onChange,
  disabled,
  fromYear = 1900,
  toYear = new Date().getFullYear() + 10,
  placeholder = "dd/mm/aaaa",
  className,
}: SmartDatePickerProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Synchronize input value when prop value changes
  React.useEffect(() => {
    if (value && isValid(value)) {
      setInputValue(format(value, "dd/MM/yyyy"));
      setError(null);
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove any character that is not a digit or /
    value = value.replace(/[^0-9/]/g, "");

    const numericValue = value.replace(/\D/g, "");

    if (value.length < inputValue.length) {
      setInputValue(value);
      return;
    }

    let formattedValue = "";
    if (numericValue.length > 0) {
      formattedValue = numericValue.substring(0, 2);
    }
    if (numericValue.length >= 3) {
      formattedValue += "/" + numericValue.substring(2, 4);
    }
    if (numericValue.length >= 5) {
      formattedValue += "/" + numericValue.substring(4, 8);
    }

    setInputValue(formattedValue);
    // Clear error while typing
    if (error) setError(null);
  };

  const handleInputBlur = () => {
    if (!inputValue.trim()) {
      onChange(undefined);
      setError(null);
      return;
    }

    // Split parts to handle 2-digit year logic manually before parsing
    const parts = inputValue.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      let year = parseInt(parts[2], 10);

      // Handle 2-digit year
      if (year < 100) {
        const currentYear = new Date().getFullYear();
        const currentYearTwoDigits = currentYear % 100;

        // If year is greater than current 2-digit year (e.g. 85 > 25), assume 19xx
        // Else assume 20xx
        // Logic: 00-25 -> 2000-2025. 26-99 -> 1926-1999.
        if (year > currentYearTwoDigits) {
          year += 1900;
        } else {
          year += 2000;
        }

        // Update input value to reflect the 4-digit year
        const newInputValue = `${day.toString().padStart(2, "0")}/${month
          .toString()
          .padStart(2, "0")}/${year}`;
        setInputValue(newInputValue);
      }

      // Validate date object
      // Month is 0-indexed in JS Date, but we construct string for date-fns or check manually
      // Let's use date-fns parse with the (potentially corrected) year
      const dateStr = `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
      const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());

      if (isValid(parsedDate)) {
        if (
          parsedDate.getFullYear() < fromYear ||
          parsedDate.getFullYear() > toYear
        ) {
          setError(`El año debe estar entre ${fromYear} y ${toYear}`);
          onChange(undefined);
          return;
        }

        // Valid date
        setError(null);
        onChange(parsedDate);
      } else {
        setError("Fecha inválida");
        onChange(undefined);
      }
    } else {
      setError("Formato incompleto (dd/mm/aaaa)");
      onChange(undefined);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    onChange(date);
    setError(null);
    setIsCalendarOpen(false);
  };

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={cn(
            "pr-10",
            error && "border-red-500 focus-visible:ring-red-500",
          )}
        />
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
              type="button"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[200]" align="end">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleCalendarSelect}
              disabled={disabled}
              initialFocus
              locale={es}
              captionLayout="dropdown"
              fromYear={fromYear}
              toYear={toYear}
              defaultMonth={value || new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
