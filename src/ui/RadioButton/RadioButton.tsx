import { FC } from "react";
import "./RadioButton.css";
import { Label } from "../Label/Label";

interface RadioButtonProps {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  keyword?: string;  // Optional keyword prop
  onChange: (value: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({ name, id, value, checked, onChange, keyword }) => {
  const className = `radio-btn ${checked ? `${value.toLowerCase()}${keyword ? `-${keyword.toLowerCase()}` : ''}` : 'default'}`;

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
        style={{ display: 'none' }} // Hiding default radio button, but using custom label
      />
      <Label
        htmlFor={id}
        className={className}  // Dynamically assigned class name
        content={value}
      />
    </>
  );
};

export default RadioButton;
