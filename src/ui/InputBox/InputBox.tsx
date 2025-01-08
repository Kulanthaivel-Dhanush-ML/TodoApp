import { FC } from "react";
import "./InputBox.css";
interface InputBoxProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder:string;
}
const InputBox: FC<InputBoxProps> = ({ name, value, onChange,placeholder }) => {
    return (
        <>
            <input type="text" name={name}
                value={value}
                onChange={onChange} placeholder={placeholder} required></input>
        </>
    )
}

export default InputBox;