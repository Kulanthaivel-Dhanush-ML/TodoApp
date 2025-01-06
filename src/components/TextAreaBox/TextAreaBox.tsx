import { FC } from "react";
import "./TextAreaBox.css";
interface TextAreaBoxProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaBox: FC<TextAreaBoxProps> = ({ name, value, onChange }) => {
    return (
        <>


            <textarea className="form-control" name={name}
                value={value}
                onChange={onChange} rows={3} placeholder="Enter Description ..."></textarea>


        </>
    )
}

export default TextAreaBox;