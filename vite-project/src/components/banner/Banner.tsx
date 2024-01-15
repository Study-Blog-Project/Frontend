import {  useEffect, useState } from "react";

interface BannerProps{
  size?:"full"|"default"
  bannerColor?:"primary"|"secondary"
  txt?:string
  txtColor?: string,
  className?:string,
  handleBanner?:() => void;
  children?:React.ReactNode;
}
interface textStyle {
  fontSize?: string;
  fontWeight?:string;
  color?: string;
}
interface BannerStyle{
  backgroundColor ?: string | undefined,
  width?: string | undefined,
  height?: string | undefined,
  border?: string | undefined,
  borderRadius?:string | undefined,
}
function Banner({size="default",
                  bannerColor="primary",
                  txt="default",
                  txtColor="white",
                  className="",
                  handleBanner=undefined,
                  children,
}:BannerProps) {

  const [txtStyle, setTxtStyle] = useState<textStyle>({});
  const [style, setStyle] = useState<BannerStyle>({});
  
  useEffect(()=>{
    let backgroundColor ="";
    let width="";
    let height="";
    const textSize = "16px"; 
    const fontWeight="bold";
    const textColor=txtColor;
    switch(bannerColor){
      case "primary":
        backgroundColor  = "#6AAFE6";
        break;
      case "secondary":
        backgroundColor  = "#303030";
        break;
    }
    const border=`1ps solid ${backgroundColor}`;
    
    switch(size){
      case "full":
        width="90%";
        height="100%";
        break;
      case "default":
        width="60%";
        height="100%";
        break;
    }
    setStyle({
      backgroundColor,
      width,
      height,
      border,
      borderRadius: '0.25rem',
    
    });
    setTxtStyle({
      fontSize: textSize,

      fontWeight,
      color:textColor
    });
  },[size,bannerColor,txt,txtColor,className,handleBanner,children])

  return (
    <div style={style} onClick={handleBanner} className={ `mb-2 pl-4 py-2 ${className}`}>
      <div style={txtStyle}>{txt}</div>
      {children && <div style={{ fontSize: '14px', lineHeight: '1.15', color:"white"}} >{children}</div>}
      </div>
  )
}

export default Banner