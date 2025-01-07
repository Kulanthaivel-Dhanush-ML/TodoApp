import { FC } from "react";
interface MyComponentProps {
    name: string;
    // color: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' ;
    color:string;
    border:string;
    text:string;
    type:'submit' | 'button';
   onclick:(e:any)=> void;
  }
const Button:FC<MyComponentProps> = ({name,color,border,text,type,onclick}) =>
{
    return(
        <>
        <div className="d-grid gap-2">
            <button
                type={type}
                className={`btn btn-${color} border-${border} text-${text}  `} onClick={onclick}>
                {name}
                
            </button>
        </div>
        
        </>
    )
}

export default Button;