import { FC} from "react";

interface DateFieldProps{
  name: string;
  min?:string;
  value: string;
  className?:string; 
  placeholder?:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DateField:FC<DateFieldProps> = ({name,value,onChange,className,placeholder,min}) => {
  
  
  return (
    <>
      <input name={name}  className={className} value={value} onChange={onChange} type="date" placeholder={placeholder}   min={min} required></input></>
  )
}
export default DateField;