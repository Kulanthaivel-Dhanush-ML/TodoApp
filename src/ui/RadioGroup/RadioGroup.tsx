import { FC, useState } from "react";
import RadioButton from "../RadioButton/RadioButton";

interface RadioGpProps {
  options: string[];
  onChange: (item: string) => void;
  name: string;
  classname: string;
  keyword?: string;
}

const RadioGp: FC<RadioGpProps> = ({
  onChange,
  options,
  name,
  classname,
  keyword,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className={classname}>
      {options.map((option: string) => (
        <RadioButton
          key={option}
          name={name}
          id={`${option}`}
          value={option}
          checked={selectedOption === option}
          keyword={keyword}
          onChange={() => {
            setSelectedOption(option);
            onChange(option);
          }}
        />
      ))}
    </div>
  );
};

export default RadioGp;
