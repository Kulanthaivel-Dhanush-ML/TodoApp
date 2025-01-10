import { FC, useState, useEffect } from "react";

interface DateFieldProps {
  name: string;
  min?: string;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: FC<DateFieldProps> = ({ name, value, onChange, className, placeholder, min }) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Getting the current date in YYYY-MM-DD format
    setCurrentDate(today); // Set currentDate to today's date
  }, []);

  return (
    <input
      name={name}
      type="date"
      className={className}
      value={value || currentDate} // Use currentDate as the default value if value is empty
      onChange={onChange}
      placeholder={placeholder}
      min={min } // Set min date to today's date if not provided
      required
    />
  );
};

export default DateField;
