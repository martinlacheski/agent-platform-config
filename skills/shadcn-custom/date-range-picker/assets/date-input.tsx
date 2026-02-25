import { Input } from "./input";

export interface DateInputProps {
  value: Date | undefined | null;
  onChange: (date: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const dateString = value
    ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    const [year, month, day] = val.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (!isNaN(date.getTime())) {
      onChange(date);
    }
  };

  return (
    <Input
      type="date"
      value={dateString}
      onChange={handleChange}
      className="w-full px-2 py-1 h-8 text-xs"
    />
  );
};
