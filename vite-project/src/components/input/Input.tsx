import { ChangeEvent, useEffect, useState } from "react";
import './style.css';
interface InputProps {
  size?: "full" | "default"
  placeHolder?: string;
  className?: string
  value?: string; 
  initialValue?: string;
  onChange?: (value: string) => void;  
  type?: "password" | "default"
}

interface InputStyle{
  width?: string | undefined,
  height?: string | undefined,
}

function Input({initialValue, placeHolder = "입력하세요", type="default", className="", onChange, value = "",  size="default",}:InputProps
) {
  const [style, setStyle] = useState<InputStyle>({});
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  
  useEffect(()=>
  {
    if(initialValue){
      setInputValue(initialValue);
      console.log(inputValue)
    }
  },[initialValue])
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };


  
  useEffect(()=>{
    // let width="";
    // let height="";
    // switch(size){
    //   case "full":
    //     width="80%";
    //     height="100%";
    //     break;
    //   case "default":
    //     width="60%";
    //     height="100%";
    //     break;
    // }
    // setStyle({
    //   width,
    //   height,
    // });
  },[placeHolder,className,size])
  return (
    <>
      
      {
        <div className={`input-wrap size-${size}`}>
          <input type={type === "password" ? "password" : "text"}
                 style={style}
                 onChange={handleInputChange}
                 value={inputValue}
                 placeholder={placeHolder}
                 className={`${className}`} />
        </div>
      }
    </>
  )
}

export default Input
