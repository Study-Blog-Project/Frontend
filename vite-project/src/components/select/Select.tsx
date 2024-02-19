import  {useState, useRef, useEffect} from "react";
import {HiChevronUpDown} from "react-icons/hi2";
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
        <div className={"flex flex-col z-10 absolute left-0 top-10 bg-white border rounded shadow w-[100px]"}>
          {data.map((item, index) => (
            <Btn
              key={index}
              buttonColor="white" 
              txtColor="black" 
              category="outlined"
              size="small"
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
            className={"z-10 w-full relative min-w-[100px]"}
            onClick={handleOnclick}
            ref={containerRef}
        >
            <div className="border border-gray-400 text-gray-800 font-semibold border-[1px] text-sm rounded-lg py-1 px-2 flex justify-between items-center cursor-pointer select-none">
                <span>{onDefaultValue}</span>
                <HiChevronUpDown />
            </div>
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
