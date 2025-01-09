import { FC } from "react";

interface TextAreaBoxProps {
    name: string;
    classname?:string;
    value: string;
    placeholder?: string;
    rows?:number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaBox: FC<TextAreaBoxProps> = ({ name, classname,value, onChange, placeholder,rows }) => {
    return (
       


            <textarea className= {`form-control ${classname}`} name={name}
                value={value}
                onChange={onChange} rows={rows} placeholder={placeholder}></textarea>


    )
}

export default TextAreaBox;