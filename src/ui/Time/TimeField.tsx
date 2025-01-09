import { FC } from "react";
import { Label } from "../Label/Label";

interface FromTimeProps {
  classname?: string;
  name: string;
  value: string;
  content: string;
  required?: boolean; 
  onTimeChange: (time: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeField: FC<FromTimeProps> = ({
  name,
  value,
  onTimeChange,
  classname,
  content,
  required,
}) => {
  return (
    <div className={classname}>
      <Label htmlFor={name} className="form-label" content={content} /> 
      <input
        name={name}
        type="time"
        className="form-control"
        value={value}
        onChange={onTimeChange}
        required={required} 
      />
    </div>
  );
};

export default TimeField;
