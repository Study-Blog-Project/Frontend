import { useEffect, useState } from "react";

interface ButtonProps {
  buttonColor?: "primary" | "secondary" | "headerBtn" | "error";
  category?: "outlined" | "text";
  backimage?: string | undefined;
  size?: "small" | "default" | "big";
  handleBtn?: () => void;
  txt?: string;
  txtColor?: string;
  className?: string;
}

interface Divstyle {
  backgroundColor?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  border?: string | undefined;
  backgroundImage?: string | undefined;
  backgroundSize?: string | undefined;
  borderRadius?: string | undefined;
  cursor?: string | undefined;
}

interface textStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

function Btn({
  buttonColor = "primary",
  category = "outlined",
  backimage = undefined,
  size = "default",
  handleBtn = undefined,
  txt = undefined,
  txtColor = "white",
  className = "",
}: ButtonProps) {
  const [txtStyle, setTxtStyle] = useState<textStyle>({});
  const [style, setStyle] = useState<Divstyle>({});

  useEffect(() => {
    let backgroundColor = "";
    let width = "";
    let height = "";
    let border = "";
    let backgroundImage = "";
    let backgroundSize = "auto";
    let textSize = "1rem";

    const fontWeight = "bold";
    const textColor = txtColor;
    switch (buttonColor) {
      case "primary":
        backgroundColor = "#6AAFE6";
        break;
      case "secondary":
        backgroundColor = "#303030";
        break;
      case "headerBtn":
        backgroundColor = "#FF4444";
        break;
      case "error":
        backgroundColor = "FF0000";
        break;
    }
    switch (category) {
      case "text":
        border = "";
        backgroundColor = "";
        console.log(backgroundColor);
        break;
      case "outlined":
        border = "1px solid black";
        break;
    }

    switch (typeof backimage) {
      case undefined:
        backgroundImage = "";
        break;
      case "string":
        backgroundImage = `url(${backimage})`;
        backgroundSize = "contain";
        break;
    }
    switch (size) {
      case "small":
        width = "100%";
        height = "2rem";
        textSize = "0.7rem";
        break;
      case "default":
        width = "100%";
        height = "3rem";
        break;
      case "big":
        width = "100%";
        height = "4rem";
        textSize = "1.3rem";
        break;
    }
    setStyle({
      backgroundColor,
      width,
      height,
      border,
      backgroundImage,
      backgroundSize,
      borderRadius: "0.25rem",
      cursor: "pointer",
    });
    setTxtStyle({
      fontSize: textSize,

      fontWeight,
      color: textColor,
    });
  }, [buttonColor, category, backimage, size, txtColor]);

  return (
    <div onClick={handleBtn} style={style} className={`flex items-center justify-center ${className}`}>
      <span style={txtStyle}>{txt}</span>
    </div>
  );
}

export default Btn;
