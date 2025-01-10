import { FC, useState, useEffect } from "react";
import { Label } from "../Label/Label";

interface FromTimeProps {
  classname?: string;
  name: string;
  value: string;
  content: string;
  required?: boolean;
  onTimeChange: (time: string) => void; // Update to pass the string value directly
}

const TimeField: FC<FromTimeProps> = ({
  name,
  value,
  onTimeChange,
  classname,
  content,
  required,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  // Set the default time to the current time when the component mounts
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    setCurrentTime(time);
  }, []);

  // Handle change in time field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);  // Update the local state when the user changes the time
    onTimeChange(newTime);     // Pass the changed value back to the parent component
  };

  return (
    <div className={classname}>
      <Label htmlFor={name} className="form-label" content={content} />
      <input
        name={name}
        type="time"
        className="form-control"
        value={value || currentTime} // Use value passed down from parent, or default to currentTime
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default TimeField;
