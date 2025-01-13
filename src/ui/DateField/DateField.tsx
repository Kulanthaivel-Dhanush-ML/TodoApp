import { FC, useState, useEffect } from "react";

interface DateFieldProps {
  name: string;
  min?: string;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDefaultIfEmpty?: boolean; 
  required?:boolean;
}

const DateField: FC<DateFieldProps> = ({ 
  name, 
  value, 
  onChange, 
  className, 
  placeholder, 
  min, 
  required,
  setDefaultIfEmpty = true 
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    setCurrentDate(today); 
  }, []);

  
  const finalValue = (setDefaultIfEmpty && !value) ? currentDate : value;

  return (
    <input
      name={name}
      type="date"
      className={className}
      value={finalValue} 
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      required={required}
    />
  );
};

export default DateField;
