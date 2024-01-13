import { useEffect, useState } from "react";

interface InputProps {
  size?:"full"|"default"
  place?:string;
  className?:string
}

interface InputStyle{
  width?: string | undefined,
  height?: string | undefined,
}

function Input({ place = "입력하세요" ,className="",size="default",}:InputProps
) {
  const [style, setStyle] = useState<InputStyle>({});
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
      <input style={style} placeholder={place} className={`rounded border border-solid border-black h-4 sm:h-1/4 md:h-1/5 py-4 my-2 ${className}`}></input>
    </>
  )
}

export default Input