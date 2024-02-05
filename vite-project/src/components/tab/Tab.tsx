import {useEffect, useState} from 'react';

interface TabProps {
  content: string[];
  className?: string;
  defaultSelected?: string;
  onTabSelect: (selectedContent: string) => void;
}

function Tab({ content = [], className = '', onTabSelect, defaultSelected }: TabProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleDivClick = (index: number) => {
    setSelectedIdx(index);
    onTabSelect(content[index])
  };

  useEffect(() => {
    console.log(defaultSelected, 'defaultSelected');
    if(!defaultSelected){
      setSelectedIdx(0);
      return;
    } 
    if(!content.includes(defaultSelected)) {
      setSelectedIdx(0);
      return;
    }
    setSelectedIdx(content.indexOf(defaultSelected));
  }, [defaultSelected]);

  return (
    <div className={`flex mt-5 mb-3 w-full border-b ${className}`}>
      {content.map((word, index) => (
        <div className={`cursor-pointer pb-2 px-5 ${selectedIdx === index ? 'border-b-[2px] border-black' : ''}`}
          key={index}
          onClick={() => handleDivClick(index)}
        >
          <span className={`text-lg ${selectedIdx === index ? 'font-bold' : 'text-gray-400'}`} >{word}</span>
        </div>
      ))}
    </div>
  );
}

export default Tab;
