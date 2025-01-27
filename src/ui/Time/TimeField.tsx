import { FC, useState, useEffect } from "react";
import { Label } from "../Label/Label";

interface FromTimeProps {
  classname?: string;
  name: string;
  value: string;
  content: string;
  required?: boolean;
  onTimeChange: (time: string) => void;
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

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    setCurrentTime(time);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className={classname}>
      <Label htmlFor={name} className="form-label" content={content} />
      <input
        name={name}
        type="time"
        className="form-control"
        value={value || currentTime}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default TimeField;
