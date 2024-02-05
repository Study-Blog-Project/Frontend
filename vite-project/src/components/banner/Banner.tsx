import {  useEffect, useState } from "react";
import './style.css';

interface BannerProps{
  bannerColor?:"primary"|"secondary"
  title?:string
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
function Banner({
                  bannerColor="primary",
                  title="default",
                  className="",
                  handleBanner=undefined,
                  children,
}:BannerProps) {


  // const [txtStyle, setTxtStyle] = useState<textStyle>({});
  // const [style, setStyle] = useState<BannerStyle>({});
  
  // useEffect(()=>{
  //   let backgroundColor ="";
  //   let width="";
  //   let height="";
  //   const textSize = "16px";
  //   const fontWeight="bold";
  //   const textColor=txtColor;
  //   switch(bannerColor){
  //     case "primary":
  //       backgroundColor  = "#6AAFE6";
  //       break;
  //     case "secondary":
  //       backgroundColor  = "#303030";
  //       break;
  //   }
  //   const border=`1ps solid ${backgroundColor}`;
  //
  //   switch(size){
  //     case "full":
  //       width="90%";
  //       height="100%";
  //       break;
  //     case "default":
  //       width="60%";
  //       height="100%";
  //       break;
  //   }
  //   setStyle({
  //     backgroundColor,
  //     width,
  //     height,
  //     border,
  //     borderRadius: '0.25rem',
  //
  //   });
  //   setTxtStyle({
  //     fontSize: textSize,
  //
  //     fontWeight,
  //     color:textColor
  //   });
  // },[size,bannerColor,title,txtColor,className,handleBanner,children])

  // return (
  //   <div style={style} onClick={handleBanner} className={ `mb-2 pl-4 py-2 ${className}`}>
  //     <div style={txtStyle}>{title}</div>
  //     {children && <div style={{ fontSize: '14px', lineHeight: '1.15', color:"white"}} >{children}</div>}
  //   </div>
  // )
  return (
    <div className={`banner-wrap bg-${bannerColor}`}>
      <div className="banner">
        <div className="banner-title">{title}</div>
        {children && <div className="banner-description">{children}</div>}
      </div>
    </div>
  )
}

export default Banner
