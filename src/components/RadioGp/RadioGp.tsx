import { FC, useState } from "react";
import RadioButton from "../RadioButton/RadioButton";

interface RadioGpProps {
  onPriorityChange: (priority: string) => void; // Callback to pass the selected priority back to the parent
}

const RadioGp: FC<RadioGpProps> = ({ onPriorityChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Handle the radio button change
  const handleRadioChange = (value: string) => {
    setSelectedOption(value); // Update local state
    onPriorityChange(value); // Pass the selected value to the parent
  };

  return (
    <div className="radiogrp">
      <RadioButton
        name="priorityradio"
        id="priorityLow"
        value="Low"
        checked={selectedOption === "Low"}
        onChange={() => handleRadioChange("Low")} // Pass the value back to parent
      />
      <RadioButton
        name="priorityradio"
        id="priorityMedium"
        value="Medium"
        checked={selectedOption === "Medium"}
        onChange={() => handleRadioChange("Medium")}
      />
      <RadioButton
        name="priorityradio"
        id="priorityHigh"
        value="High"
        checked={selectedOption === "High"}
        onChange={() => handleRadioChange("High")}
      />
    </div>
  );
};

export default RadioGp;
