import { FC } from "react";
import "./RadioButton.css";
import { Label } from "../Label/Label";
interface RadioButtonProps {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void; 
}

const RadioButton: FC<RadioButtonProps> = ({ name, id, value, checked, onChange }) => {
  
  return (
    <>
      <input
        type="radio"
        className="form-check-input"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)} 
        style={{ display: 'none' }} 
      />
      <Label
        htmlFor={id} 
        className={`radio-btn ${checked ? value.toLowerCase() : "default"}`}
        content={value}
      />
    </>
  );
};

export default RadioButton;
