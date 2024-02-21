import { useEffect, useState } from "react";

export interface PinProps {
  chipColor?: "red" | "green" | "yellow" | "blue" | "purple" | "pink";
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

function Chip({ chipColor = "red", txt = "default", className = "" }: PinProps) {
  const [style, setStyle] = useState<Divstyle>({});
  const [txtStyle, setTxtStyle] = useState<textStyle>({});
  useEffect(() => {
    let backgroundColor = "";
    let txtColor = "white";
    switch (chipColor) {
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
      case "기타":
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
    });
    setTxtStyle({
      color: txtColor,
    });
  }, [chipColor, txt]);
  return (
    <span style={{...style, ...txtStyle}} className={`flex text-xs font-bold px-1.5 py-1 rounded-xl justify-center items-center ${className}`}>
      {txt}
    </span>
  );
}

export default Chip;
