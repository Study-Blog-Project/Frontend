import  {useState, useRef, useEffect} from "react";
import Btn from "../button/Btn";



interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}


interface SelectProps {
    defaultValue?: string;
    placeholder?: string;
    widthSize?: "full" | "fit" | number;
    textSize?: string;
    data: Option[] 
    onSelect?: (selectedValue: string) => void;
}

const SelectComponent = ({
                             defaultValue = "cs",
                             data,
                             onSelect,
                         }: SelectProps) => {
    const [isAppear, setIsAppear] = useState(false);
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [onDefaultValue, setonDefaultValue] = useState(defaultValue);
    useEffect(()=>{
      onSelect?.(defaultValue);
    },[])
    
    const handleOnclick = () => {

        setIsAppear(!isAppear);
    };

    const handleButtonClicked = (itemValue: string) => {
        setonDefaultValue(itemValue);
        
        setIsAppear(false);
        if (inputRef.current) {
            inputRef.current.value = ""; 
        }
        console.log(itemValue);

        onSelect?.(itemValue);
    };
    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsAppear(false);
        }
    }

    useEffect(() => { //select 바깥영역 클릭하면 사라지는 이벤트 추가,제거
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [])



    useEffect( () => {
        console.log("3. isAppear: " + isAppear);
    },[isAppear])



  

    const renderSelect = (data: Option[]) => {
      return (
        <div className={"flex flex-col z-10"}>
          {data.map((item, index) => (
            <Btn
              key={index}
              buttonColor="white" 
              txtColor="black" 
              category="outlined"
              size="big"
              handleBtn={() => handleButtonClicked(item.value)}
              txt={item.label}
              className="mb-1"
            />
          ))}
        </div>
      );
    };
    
    

    return (
        <div
            className={"z-10 w-full "}
            onClick={handleOnclick}
            ref={containerRef}
        >
          {onDefaultValue}
            <div
           
                ref={inputRef}
                onClick={(event) => {
                    event.stopPropagation();
                    handleOnclick();
                }}
            
            />
            {
              data &&
              isAppear &&
              (
                  renderSelect(data)

              )
            }
        </div>
    );
};

export default SelectComponent;
