import { ChangeEvent, useEffect, useState } from "react";
import './style.css';
interface InputProps {
  size?:"full"|"default"
  place?:string;
  className?:string
  value?: string; 
  onChange?: (value: string) => void;  
  type?:"password"|"default"
}

interface InputStyle{
  width?: string | undefined,
  height?: string | undefined,
}

function Input({ place = "입력하세요" ,type="default" ,className="",   onChange, value = "",  size="default",}:InputProps
) {
  const [style, setStyle] = useState<InputStyle>({});
  const [inputValue, setInputValue] = useState<string>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };


  
  useEffect(()=>{
    let width="";
    let height="";
    switch(size){
      case "full":
        width="80%";
        height="100%";
        break;
      case "default":
        width="60%";
        height="100%";
        break;
    }
    setStyle({
      width,
      height,
    });
  },[place,className,size])
  return (
    <>
      
      {<input type={type === "password" ? "password" : "text"} style={style} onChange={handleInputChange} value={inputValue} placeholder={place} className={`rounded border border-solid border-black pl-2 mr-6 py-4 my-1 ${className}`}></input>}
    </>
  )
}

export default Input