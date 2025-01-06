import { FC, useEffect, useState } from "react";
interface DateFieldProps{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DateField:FC<DateFieldProps> = ({name,value,onChange}) => {
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);
  return (
    <><label className="mb-1">Select Date</label>
      <input name={name} value={value} onChange={onChange}type="date" className="form-control" id="dateInput" min={minDate} required></input></>
  )
}
export default DateField;