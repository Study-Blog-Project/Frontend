import React, { useEffect, useState, ReactElement } from 'react';

interface ModalProps {
  open: boolean;
  size?: "narrow" | "medium" | "wide";
  children?: React.ReactNode;
  onClose?: () => void;
}

interface containerRefStyle {
  width?: string | undefined;
  height?: string | undefined;
}

function Modal({ size = "medium", children, open, onClose }: ModalProps) {
  const [style, setStyle] = useState<containerRefStyle>({});

  // useEffect(() => {
  //   let width = "0";
  //   let height = "0";
  //   switch (size) {
  //     case "narrow":
  //       width = "30%";
  //       height = "50%";
  //       break;
  //     case "medium":
  //       width = "40%";
  //       height = "60%";
  //       break;
  //     case "wide":
  //       width = "50%";
  //       height = "70%";
  //       break;
  //   }
  //   setStyle({
  //     width,
  //     height,
  //   });
  // }, [size]);

  // const childrenWithStyle = React.Children.map(children, (child) => {
  //   if (React.isValidElement(child)) {
  //
  //     return React.cloneElement(child as ReactElement, { style });
  //   }
  //   return child;
  // }) as ReactElement | ReactElement[];

  return (
    <>
      { open && (
        <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30" onClick={() => onClose?.()}></div>
          <div
            className="mx-auto my-auto w-[90%] h-[80%] bg-white rounded-xl shadow-xl z-10 max-w-[600px]"
          > {children} </div>
        </div>
      )}
    </>
  );
}

export default Modal;
