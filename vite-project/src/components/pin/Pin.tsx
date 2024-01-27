import { useEffect, useState } from "react";

export interface PinProps {
  pinColor?: "red" | "green" | "yellow" | "blue" | "purple" | "pink";
  txt?: string;
  className?: string;
}

interface textStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

interface Divstyle {
  backgroundColor?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  borderRadius?: string | undefined;
}

function Pin({ pinColor = "red", txt = "default", className = "" }: PinProps) {
  const [style, setStyle] = useState<Divstyle>({});
  const [txtStyle, setTxtStyle] = useState<textStyle>({});
  useEffect(() => {
    let backgroundColor = "";
    const width = "70px";
    const height = "30px";
    const textSize = "0.9rem";
    const fontWeight = "1000";
    let txtColor = "white";
    const borderRadius = "30px";
    switch (pinColor) {
      case "red":
        backgroundColor = "#F13015";
        break;
      case "green":
        backgroundColor = "#00964E";
        break;
      case "yellow":
        backgroundColor = "#F1DE08";
        txtColor="black";
        break;
      case "blue":
        backgroundColor = "#30A9DE";
        break;
      case "purple":
        backgroundColor = "#2B0EDF";
        break;
      case "pink":
        backgroundColor = "#D400F6";
        break;
    }
    switch (txt) {
      case "모집완료":
        backgroundColor = "#F13015";
        break;
      case "모집중":
        backgroundColor = "#00964E";
        break;
      case "CS":
        backgroundColor = "#F1DE08";
        txtColor="black";
        break;
      case "etc":
        backgroundColor = "#30A9DE";
        break;
      case "코테":
        backgroundColor = "#2B0EDF";
        break;
      case "프로젝트":
        backgroundColor = "#D400F6";
        break;
    }
    setStyle({
      backgroundColor,
      width,
      height,
      borderRadius,
    });
    setTxtStyle({
      fontSize: textSize,
      fontWeight,
      color: txtColor,
    });
  }, [pinColor, txt]);
  return (
    <span style={style} className={`flex justify-center items-center ${className}`}>
      <span style={txtStyle}>{txt}</span>
    </span>
  );
}

export default Pin;
