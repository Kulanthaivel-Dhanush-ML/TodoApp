import { FC } from "react";
import { Label } from "../Label/Label";

interface FromTimeProps {
  classname?:string;
  name: string;
  value: string;  // The value of the time field, passed from the parent
  content: string;
  onTimeChange: (time: React.ChangeEvent<HTMLInputElement>) => void;  // Callback to update the parent state
}

const TimeField: FC<FromTimeProps> = ({ name, value, onTimeChange,classname,content }) => {
  
  

  return (
    <>
      <div className={classname}>
        <Label htmlFor="htmlFor" className="form-label"
          content={content}
        />
        <input
          name={name}
          type="time"
          className="form-control"
          value={value}  // Use the value prop passed from the parent
          onChange={onTimeChange}
          required
        />
      </div>

     
    </>
  );
};

export default TimeField;
