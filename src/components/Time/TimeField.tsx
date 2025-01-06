import { FC } from "react";
import "./TimeField.css";

interface FromTimeProps {
  name: string;
  value: string;  // The value of the time field, passed from the parent
  onTimeChange: (time: string) => void;  // Callback to update the parent state
}

const TimeField: FC<FromTimeProps> = ({ name, value, onTimeChange }) => {
  const handleFromTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromTime = e.target.value;
    onTimeChange(newFromTime);  // Update the parent's state with the new time
  };

  

  return (
    <>
      <div className="from">
        <label htmlFor="fromTime" className="form-label">
          From Time
        </label>
        <input
          name={name}
          type="time"
          className="form-control"
          id="fromTime"
          value={value}  // Use the value prop passed from the parent
          onChange={handleFromTimeChange}
          required
        />
      </div>

     
    </>
  );
};

export default TimeField;
