import { FC } from "react";
interface MyComponentProps {
    name: string;
    // color: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' ;
    color:string;
    border?:string;
    text?:string;
    type?:'submit' | 'button';
    classname?:string;
   onclick?:(e:React.FormEvent)=> void | (()=>void);
  } 
const Button:FC<MyComponentProps> = ({name,color,border="none",text="white",type="button",classname,onclick}) =>
{
    return(
        
        <div className="d-grid gap-2">
            <button
                type={type}
                className={`btn btn-${color} border-${border} text-${text} ${classname} `} onClick={onclick}>
                {name}
                
            </button>
        </div>
        
    )
}

export default Button;