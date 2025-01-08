import { FC } from "react";

interface LabelComponent
{
    htmlFor?:string;
    content:string;
    className?:string;
}

export const Label: FC<LabelComponent> = ({htmlFor,content,className}) =>
{
    return(
        <label htmlFor={htmlFor} className={className}>{content}</label>
    )
}
    