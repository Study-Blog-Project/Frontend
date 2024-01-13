import React, { useEffect, useState, ReactElement } from 'react';

interface ModalProps {
  size?: "narrow" | "medium" | "wide";
  children?: React.ReactNode;
}

interface containerRefStyle {
  width?: string | undefined;
  height?: string | undefined;
}

function Modal({ size = "medium", children }: ModalProps) {
  const [style, setStyle] = useState<containerRefStyle>({});

  useEffect(() => {
    let width = "0";
    let height = "0";
    switch (size) {
      case "narrow":
        width = "30%";
        height = "50%";
        break;
      case "medium":
        width = "40%";
        height = "60%";
        break;
      case "wide":
        width = "50%";
        height = "70%";
        break;
    }
    setStyle({
      width,
      height,
    });
  }, [size]);

  const childrenWithStyle = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {

      return React.cloneElement(child as ReactElement, { style });
    }
    return child;
  }) as ReactElement | ReactElement[];

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center bg-black opacity-85 w-full h-full"
    >
        {childrenWithStyle}
    
    </div>
  );
}

export default Modal;
