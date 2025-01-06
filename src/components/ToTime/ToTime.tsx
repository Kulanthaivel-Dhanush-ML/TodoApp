import { FC } from "react";
import "../Time/TimeField.css";

interface ToTimeProps {
  name: string;
  value: string;  // The value of the time field, passed from the parent
  onTimeChange: (time: string) => void;  // Callback to update the parent state
}

const ToTime: FC<ToTimeProps> = ({ name, value, onTimeChange }) => {
  
  const handleToTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToTime = e.target.value;
    onTimeChange(newToTime);  // Update the parent's state with the new time
  };

  return (
    <>
      

      <div className="to mt-2">
        <label htmlFor="toTime" className="form-label">
          To Time
        </label>
        <input
        name={name}
          type="time"
          className="form-control"
          id="toTime"
          value={value}  // Use the value prop passed from the parent
          onChange={handleToTimeChange}
          min={value}  // Ensure "toTime" is after "fromTime"
          required
        />
      </div>
    </>
  );
};

export default ToTime;
