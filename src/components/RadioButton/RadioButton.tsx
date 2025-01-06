import { FC } from "react";
import "../RadioGp/RadioGp.css";
import "./RadioButton.css";
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
      <label
        htmlFor={id} // links the label to the radio button using its id
        className={`radio-btn ${checked ? value.toLowerCase() : "default"}`}
      >
        {value}
      </label>
    </>
  );
};

export default RadioButton;
